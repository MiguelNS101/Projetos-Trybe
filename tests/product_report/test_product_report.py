from inventory_report.inventory.product import Product


def test_relatorio_produto():
    PRODUCT = Product(
        "1",
        "cadeira",
        "Target Corporation",
        "2021-02-18",
        "2025-09-17",
        "CR25",
        "empilhadas",
    )

    assert (
        str(PRODUCT.__repr__()) == "O produto cadeira "
        "fabricado em 2021-02-18 "
        "por Target Corporation com validade "
        "até 2025-09-17 precisa ser armazenado empilhadas."
    )
