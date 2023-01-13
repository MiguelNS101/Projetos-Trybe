from inventory_report.reports.simple_report import SimpleReport


class CompleteReport(SimpleReport):
    def generareComplete(data):
        empr_item_quant = dict()
        for produto in data:
            nome_empr = produto["nome_da_empresa"]
            if nome_empr in empr_item_quant:
                empr_item_quant[nome_empr] += 1
            else:
                empr_item_quant[nome_empr] = 1

        empr_list = str()
        for (nome_empr, quant) in empr_item_quant.items():
            empr_list += f"- {nome_empr}: {quant}\n"
        return empr_list

    def generate(prod_list):
        return (
            f"{SimpleReport.generate(prod_list)}\n"
            f"Produtos estocados por empresa:\n"
            f"{CompleteReport.generareComplete(prod_list)}"
        )
