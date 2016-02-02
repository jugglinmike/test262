import re, os

from case import Case
from template import Template

hashesFilenamePattern = re.compile(r'^[^\.].*\.hashes$')

class Expander:
    def __init__(self, case_dir):
        self.templates = dict()
        self.case_dir = case_dir

    def _load_templates(self, template_class):
        directory = os.path.join(self.case_dir, template_class)
        templates = []
        for subdirectory, _, filenames in os.walk(directory):
            subdirectory = os.path.relpath(subdirectory, directory)
            if subdirectory == '.':
                subdirectory = ''

            for filename in filenames:
                if self.is_template_file(filename):
                    templates.append(
                        Template(directory, os.path.join(subdirectory, filename)))

        self.templates[template_class] = templates

    def _get_templates(self, template_class):
        if not template_class in self.templates:
            self._load_templates(template_class)

        return self.templates[template_class]

    def is_template_file(self, filename):
      return re.match(hashesFilenamePattern, filename)

    def list_cases(self):
        for name in os.listdir(self.case_dir):
            full = os.path.join(self.case_dir, name)
            if os.path.isfile(full) and hashesFilenamePattern.match(name):
                yield full

    def expand(self, encoding, case_file = None):
        if case_file:
            case_files = [case_file]
        else:
            case_files = self.list_cases()

        for case_file in case_files:
            for test in self.expand_case(case_file, encoding):
                yield test

    def expand_case(self, file_name, encoding):
        case = Case(file_name)

        template_class = case.attribs['meta']['template']
        templates = self.templates.get(template_class)

        for template in self._get_templates(template_class):
            yield template.expand(case, encoding)
