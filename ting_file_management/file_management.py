import sys


def txt_importer(path_file):
    text = []
    if not path_file.endswith('.txt'):
        print("Formato inválido", file=sys.stderr)
    else:
        try:
            with open(path_file, "r") as file:
                for line in file:
                    text.append(line.strip())
            return text
        except FileNotFoundError:
            return print(f"Arquivo {path_file} não encontrado",
                         file=sys.stderr)
