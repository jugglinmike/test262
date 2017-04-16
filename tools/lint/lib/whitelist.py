def parse(handle):
    whitelist = dict()

    for line in handle:
        parts = line.split()
        file_name = parts[0]
        check_names = set(parts[1:])

        assert file_name not in whitelist, 'Whitelist should have a single entry for each file'

        assert len(check_names) > 0, 'Each whitelist entry should specify at least on check'

        whitelist[file_name] = check_names

    return whitelist
