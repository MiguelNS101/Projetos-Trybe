from functools import lru_cache
import csv


@lru_cache
def read(path):
    """Reads a file from a given path and returns its contents

    Parameters
    ----------
    path : str
        Full path to file

    Returns
    -------
    list
        List of rows as dicts
    """
    list = []
    with open(path, encoding="utf-8") as file:
        file_reader = csv.DictReader(file, delimiter=",", quotechar='"')

        for row in file_reader:
            list.append(row)

    return list
