# from pytest import raises
from inventory_report.inventory.product import Product


def test_cria_produto():
    PRODUCT = Product(
        "1",
        "cadeira",
        "Target Corporation",
        "2021-02-18",
        "2025-09-17",
        "CR25",
        "empilhadas",
    )

    assert PRODUCT.id == "1"
    assert PRODUCT.nome_do_produto == "cadeira"
    assert PRODUCT.nome_da_empresa == "Target Corporation"
    assert PRODUCT.data_de_fabricacao == "2021-02-18"
    assert PRODUCT.data_de_validade == "2025-09-17"
    assert PRODUCT.numero_de_serie == "CR25"
    assert PRODUCT.instrucoes_de_armazenamento == "empilhadas"
