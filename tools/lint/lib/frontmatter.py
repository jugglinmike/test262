import re
import yaml

def parse(src):
    match = re.search(r'/\*---(.*)---\*/', src, re.DOTALL)
    if not match:
        return None

    try:
        return yaml.load(match.group(1))
    except (yaml.scanner.ScannerError, yaml.parser.ParserError):
        return None
