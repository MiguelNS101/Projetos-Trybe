from pytest import raises
from src.brazilian_jobs import read_brazilian_file

PATH = "tests/mocks/brazilians_jobs.csv"
result = {"title": "Motorista", "salary": "3000", "type": "full time"}


def test_brazilian_jobs():
    assert result in read_brazilian_file(PATH)

    with raises(FileNotFoundError):
        read_brazilian_file("tests/mocks/null")
