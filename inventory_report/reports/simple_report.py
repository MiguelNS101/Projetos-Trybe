from datetime import date
import operator


class SimpleReport:
    def generate(prod_list):
        fab_base = date.fromisoformat(prod_list[0]["data_de_fabricacao"])
        val_base = date.fromisoformat(prod_list[0]["data_de_validade"])
        empr_item_quant = dict()

        for produto in prod_list:
            fab_date = date.fromisoformat(produto["data_de_fabricacao"])
            val_date = date.fromisoformat(produto["data_de_validade"])

            if fab_date < fab_base:
                fab_base = fab_date
            if date.today() < val_date < val_base:
                val_base = val_date

            nome_empr = produto["nome_da_empresa"]
            empr_item_quant[nome_empr] = 1 + empr_item_quant.get(nome_empr, 0)
        empr_max = max(empr_item_quant.items(), key=operator.itemgetter(1))[0]

        return (
            f"Data de fabricação mais antiga: {fab_base}\n"
            f"Data de validade mais próxima: {val_base}\n"
            f"Empresa com mais produtos: {empr_max}"
        )
