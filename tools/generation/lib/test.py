import re

from util.find_comments import find_comments
from util.parse_yaml import parse_yaml

class Test:
    def __init__(self, file_name):
        self.attribs = dict(meta=None)

        with open(file_name) as handle:
            self._parse(handle.read())

    def _parse(self, source):
        for comment in find_comments(source):
            meta = parse_yaml(comment['source'])
            if meta:
                self.attribs['meta'] = meta
                break

    def is_generated(self):
        if not self.attribs['meta']:
            return False
        flags = self.attribs['meta'].get('flags')

        if not flags:
            return False

        return 'generated' in flags
