import os, re
import codecs, yaml

from util.find_comments import find_comments
from util.parse_yaml import parse_yaml

indentPattern = re.compile(r'^(\s*)')
interpolatePattern = re.compile(r'\{\s*(\S+)\s*\}')

def _indent(text, prefix = '    '):
    '''Prefix a block of text (as defined by the "line break" control
    character) with some character sequence.'''

    if isinstance(text, list):
        lines = text
    else:
        lines = text.split('\n')

    return prefix + ('\n' + prefix).join(lines)

class Template:
    def __init__(self, file_name):
        self.file_name = file_name

        with open(file_name) as template_file:
            self.source = template_file.read()

        self.attribs = dict()
        self.regions = []

        self._parse()

    def _parse(self):
        for comment in find_comments(self.source):
            meta = parse_yaml(comment['source'])
            if meta:
                self.attribs['meta'] = meta
                # Create a region for the template's frontmatter comment so
                # that it is removed during expansion.
                self.regions.insert(0, dict(name='__yaml', **comment))
                continue

            match = interpolatePattern.match(comment['source'])

            if match == None:
                continue

            self.regions.insert(0, dict(name=match.group(1), **comment))

    def expand_regions(self, source, context):
        lines = source.split('\n')

        for region in self.regions:
            whitespace = indentPattern.match(lines[region['lineno']]).group(1)
            value = context['regions'].get(region['name'], '')
            source = source[:region['firstchar']] + \
                _indent(value, whitespace).lstrip() + \
                source[region['lastchar']:]

        setup = context['regions'].get('setup')

        if setup:
            source = setup + '\n' + source

        return source

    def _frontmatter(self, case_values, form_values, sources):
        sources = _indent(sources, '// - ')
        description = case_values['meta']['desc'].strip() + \
            ' (' + form_values['meta']['name'].strip() + ')'
        lines = []

        lines += [
            '// This file was procedurally generated from the following sources:',
            sources,
            '/*---',
            'description: ' + description,
            'es6id: ' + form_values['meta']['es6id']
        ]

        features = []
        features += case_values['meta'].get('features', [])
        features += form_values['meta'].get('features', [])
        if len(features):
            lines += ['features: ' + yaml.dump(features)]

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

    def expand(self, case_filename, case_values, encoding):
        frontmatter = self._frontmatter(
            case_values, self.attribs, [case_filename, self.file_name])
        body = self.expand_regions(self.source, case_values)

        return dict(
            name = self.attribs['meta']['path'] + os.path.basename(case_filename[:-7]) + '.js',
            source = codecs.encode(frontmatter + '\n' + body, encoding)
        )
