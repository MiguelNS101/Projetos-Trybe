import csv
from src.track_orders import TrackOrders


def analyze_log(path_to_file):
    if not path_to_file.endswith(".csv"):
        raise FileNotFoundError(f"Extensão inválida: '{path_to_file}'")

    try:
        csv_data = TrackOrders()

        with open(path_to_file) as csv_file:
            file = csv.reader(csv_file, delimiter=',')
            for customer, order, day in file:
                csv_data.add_new_order(customer, order, day)

        res1 = csv_data.get_most_ordered_dish_per_customer('maria')
        res2 = csv_data.get_number_of_orders('arnaldo', 'hamburguer')
        res3 = csv_data.get_never_ordered_per_customer('joao')
        res4 = csv_data.get_days_never_visited_per_customer('joao')

        with open("data/mkt_campaign.txt", mode="w") as txt_file:
            txt_file.write(f'{res1}\n{res2}\n{res3}\n{res4}')
    except FileNotFoundError:
        raise FileNotFoundError(f"Arquivo inexistente: '{path_to_file}'")
