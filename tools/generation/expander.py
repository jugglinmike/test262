import re, os
from parse_yaml import parse_yaml
from find_comments import find_comments
from template import Template

hashesFilenamePattern = re.compile(r'^[^\.].*\.hashes$')

regionStartPattern = re.compile(r'\s*#\s*region\s+(\S+)\s*{')
regionEndPattern = re.compile(r'\s*}')

def _parse(source):
    case = dict(meta=None, regions=dict())
    region_name = None
    region_start = 0
    lines = source.split('\n')

    for comment in find_comments(source):
        meta = parse_yaml(comment['source'])
        if meta:
            case['meta'] = meta
            continue

        match = regionStartPattern.match(comment['source'])
        if match:
            region_name = match.group(1)
            region_start = comment['lineno']
            continue

        if region_name:
            match = regionEndPattern.match(comment['source'])
            if match:
                case['regions'][region_name] = \
                    '\n'.join(lines[region_start:comment['lineno'] - 1])
                region_name = None
                region_start = 0

    return case

class Expander:
    def __init__(self, case_dir):
        self.templates = dict()
        self.case_dir = case_dir

    def load_templates(self, name):
        directory = os.path.join(self.case_dir, name)
        file_names = map(
            lambda x: os.path.join(directory, x),
            filter(self.is_template_file, os.listdir(directory))
        )

        for file_name in file_names:
            yield Template(file_name)

    def is_template_file(self, filename):
      return re.match(hashesFilenamePattern, filename)

    def list_cases(self):
        for name in os.listdir(self.case_dir):
            full = os.path.join(self.case_dir, name)
            if os.path.isfile(full) and hashesFilenamePattern.match(name):
                yield full

    def expand(self, case_file = None):
        caseValues = None
        group = None

        if case_file:
            return [self.expand_case(case_file)]

        return [self.expand_case(x) for x in self.list_cases()]

    def expand_case(self, file_name):
        with open(file_name) as case:
            case_values = _parse(case.read())

        template_name = case_values['meta']['template']
        templates = self.templates.get(template_name)
        if not templates:
            templates = self.templates[template_name] = [x for x in self.load_templates(template_name)]

        for template in templates:
            yield template.expand(file_name, case_values)
