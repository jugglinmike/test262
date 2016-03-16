import yaml, re

yamlPattern = re.compile(r'\---\n([\s]*)((?:\s|\S)*)[\n\s*]---',
                         flags=re.DOTALL|re.MULTILINE)

def parse_yaml(string):
    match = yamlPattern.match(string)
    if not match:
        return False

    unindented = re.sub('^' + match.group(1), '',
        match.group(2), flags=re.MULTILINE)

    return yaml.safe_load(unindented)
