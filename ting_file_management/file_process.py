import sys

from ting_file_management.file_management import txt_importer


def process(path_file, instance):
    text = txt_importer(path_file)
    result = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(text),
        "linhas_do_arquivo": text
    }

    if result not in instance._data:
        instance.enqueue(result)
        return print(result)


def remove(instance):
    if instance.is_empty():
        return print('Não há elementos')

    result = instance.dequeue()
    return print(f"Arquivo {result['nome_do_arquivo']} removido com sucesso")


def file_metadata(instance, position):
    try:
        result = instance.search(position)
        return print(result)
    except IndexError:
        return print("Posição inválida", file=sys.stderr)
