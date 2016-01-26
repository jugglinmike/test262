import os, re

templateFilenamePattern = re.compile(r'^[^\.].*\.hashes')

def is_template_file(filename):
  return re.match(templateFilenamePattern, filename)

def forms(directory):
    file_names = map(
        lambda x: directory + '/' + x,
        filter(is_template_file, os.listdir(directory))
    )

    for file_name in file_names:
        with open(file_name) as template_file:
            yield (file_name, template_file.read())

def cases(directory):
    for subdirectory, _, file_names in os.walk(directory):
        file_names = map(
            lambda x: os.path.join(subdirectory, x),
            filter(is_template_file, file_names)
        )

        for file_name in file_names:
            yield file_name
