from pytest import raises
from src.counter import count_ocurrences

PATH = "src/jobs.csv"
python_total = 1639


def test_counter():
    assert count_ocurrences(PATH, "python") == python_total
    assert count_ocurrences(PATH, "linguagem_NULL") == 0

    with raises(AttributeError, match="'int' object has no attribute 'lower'"):
        count_ocurrences(PATH, 1)
