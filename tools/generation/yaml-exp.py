import yaml, re
import monkey_yaml

a = """---
es6id: 13.4.3.2
info: |
    this is the first line
    this is the second line
    this is the third line

    this is another paragraph
    this is the same paragraph

        this has been indented
        this has also been indented"""

print a

print '---------------'

print yaml.safe_load(a)['info']

print '---------------'

print yaml.dump(yaml.safe_load(a), default_flow_style=False)

print '---------------'
