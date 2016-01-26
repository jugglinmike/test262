import re, os, yaml
from find_comments import find_comments

hashesFilenamePattern = re.compile(r'^[^\.].*\.hashes$')

yamlPattern = re.compile(r'\---[\n\s]*((?:\s|\S)*)[\n\s*]---',
                         flags=re.DOTALL|re.MULTILINE)
regionStartPattern = re.compile(r'\s*#\s*region\s+(\S+)\s*{')
regionEndPattern = re.compile(r'\s*}')
interpolatePattern = re.compile(r'\{\s*(\S+)\s*\}')
indentPattern = re.compile(r'^(\s*)')

def _indent(text, prefix = '    '):
    '''Prefix a block of text (as defined by the "line break" control
    character) with some character sequence.'''

    if isinstance(text, list):
        lines = text
    else:
        lines = text.split('\n')

    return prefix + ('\n' + prefix).join(lines)

def _parse(source):
    case = dict(meta=None, regions=dict())
    region_name = None
    region_start = 0
    lines = source.split('\n')

    for comment in find_comments(source):
        match = yamlPattern.match(comment['source'])
        if match:
            case['meta'] = yaml.safe_load(match.group(1))
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

class Template:
    def __init__(self, file_name):
        self.file_name = file_name

        with open(file_name) as template_file:
            self.source = template_file.read()

        self.attribs = _parse(self.source)

    def expand_regions(self, source, context):
        replacements = []
        lines = source.split('\n')

        for comment in find_comments(source):
            match = yamlPattern.match(comment['source'])
            if match:
                replacements.insert(0, dict(value='', **comment))
                continue

            match = interpolatePattern.match(comment['source'])

            if match == None:
                continue
            value = context['regions'].get(match.group(1), '')
            replacements.insert(0, dict(value=value, **comment))

        for replacement in replacements:
            whitespace = indentPattern.match(lines[replacement['lineno']]).group(1)
            source = source[:replacement['firstchar']] + \
                _indent(replacement['value'], whitespace).lstrip() + \
                source[replacement['lastchar']:]
        setup = context['regions'].get('setup')

        if setup:
            source = setup + '\n' + source

        return source

    def _frontmatter(self, case_values, form_values, sources):
        sources = _indent(sources, '// - ')
        description = case_values['meta']['desc'] + \
            ' (' + form_values['meta']['name'] + ')'
        lines = []

        lines += [
            '// This file was procedurally generated from the following sources:',
            sources,
            '/*---',
            'description: ' + description,
            'es6id: ' + form_values['meta']['es6id']
        ]

        if case_values['meta'].get('features'):
            lines += ['features: ' + yaml.dump(case_values['meta'].get('features'))]

        if case_values['meta'].get('negative'):
            lines += ['negative: ' + case_values['meta'].get('negative')]

        lines += [
            'info: >',
            _indent(case_values['meta']['info']),
            '',
            _indent(form_values['meta']['info']),
            '---*/'
        ]

        return '\n'.join(lines)

    def expand(self, case_filename, case_values):
        output = []

        form_location = os.path.join('src', 'forms', case_values['meta']['template'])

        output.append(dict(
            name = self.attribs['meta']['path'] + os.path.basename(case_filename[:-7]) + '.js',
            source = self._frontmatter(case_values, self.attribs, [case_filename, self.file_name]) + '\n' + self.expand_regions(self.source, case_values)
        ))

        return output

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
