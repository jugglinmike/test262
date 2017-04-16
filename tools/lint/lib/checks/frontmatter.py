from ..check import Check

_required_fields = set(['description'])
_optional_fields = set([
    'author', 'es5id', 'es6id', 'esid', 'features', 'flags', 'includes',
    'info', 'negative', 'timeout'
])
_valid_fields = _required_fields | _optional_fields

class CheckFrontmatter(Check):
    '''Ensure tests have the expected YAML-formatted metadata.'''
    ID = 'FRONTMATTER'

    def run(self, name, meta, source):
        if name.endswith('_FIXTURE.js'):
            if meta is not None:
                return '"Fixture" files cannot specify metadata'
            return

        if meta is None:
            return 'No valid YAML-formatted frontmatter'

        fields = set(meta.keys())

        missing = _required_fields - fields
        if len(missing) > 0:
            return 'Required fields missing: %s' % ', '.join(list(missing))

        unrecognized = fields - _valid_fields
        if len(unrecognized) > 0:
            return 'Unrecognized fields: %s' % ', '.join(list(unrecognized))

        if 'negative' in meta:
            negative = meta['negative']
            if not isinstance(negative, dict):
                return '"negative" must be a dictionary with fields "type" and "phase"'

            if not 'type' in negative:
                return '"negative" must specify a "type" field'

            if not 'phase' in negative:
                return '"negative" must specify a "phase" field'
