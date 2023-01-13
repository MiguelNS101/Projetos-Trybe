from inventory_report.reports.simple_report import SimpleReport
from inventory_report.reports.complete_report import CompleteReport
from inventory_report.importer.csv_importer import CsvImporter
from inventory_report.importer.json_importer import JsonImporter
from inventory_report.importer.xml_importer import XmlImporter


class Inventory:
    def import_data(path, type):
        report = str()
        product_info = []

        if path.endswith("csv"):
            product_info = CsvImporter.import_data(path)
        elif path.endswith("json"):
            product_info = JsonImporter.import_data(path)
        elif path.endswith("xml"):
            product_info = XmlImporter.import_data(path)
        else:
            raise ValueError("Arquivo inválido")

        if type == "simples":
            report = SimpleReport.generate(product_info)
        else:
            report = CompleteReport.generate(product_info)

        return report
