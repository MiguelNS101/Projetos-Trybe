def exists_word(word, instance):
    result = []
    size = len(instance)
    for index in range(size):
        lines = []
        filename = instance.search(index)

        for line, data in enumerate(filename["linhas_do_arquivo"]):
            if word.lower() in data.lower():
                lines.append({"linha": line + 1})

        res = {
                "palavra": word,
                "arquivo": filename["nome_do_arquivo"],
                "ocorrencias": lines
            }

        if len(lines):
            result.append(res)
    return result


def search_by_word(word, instance):
    result = []
    size = len(instance)
    for index in range(size):
        lines = []
        filename = instance.search(index)

        for line, data in enumerate(filename["linhas_do_arquivo"]):
            if word.lower() in data.lower():
                lines.append({"linha": line + 1, "conteudo": data})

        res = {
                "palavra": word,
                "arquivo": filename["nome_do_arquivo"],
                "ocorrencias": lines
            }

        if len(lines):
            result.append(res)
    return result
