from inventory_report.importer.importer import Importer
from xml.etree import ElementTree as ET


class XmlImporter(Importer):
    def import_data(path):
        if path.endswith("xml"):
            tree = ET.parse(path)
            root = list(tree.getroot())
            data_dict = {}
            list_dict = []

            for index in range(len(root)):
                for data in root[index]:
                    data_dict[data.tag] = data.text
                list_dict.append(data_dict)
                data_dict = {}

            return list_dict
        else:
            raise ValueError("Arquivo inválido")
