class TrackOrders:
    def __init__(self):
        self.data = []

    # aqui deve expor a quantidade de estoque
    def __len__(self):
        return len(self.data)

    def add_new_order(self, customer, order, day):
        self.data.append((customer, order, day))

    def get_most_ordered_dish_per_customer(self, customer):
        order_list = []
        for custom, order, day in self.data:
            if (custom == customer):
                order_list.append(order)

        return max(set(order_list), key=order_list.count)

    def get_number_of_orders(self, customer, product):
        counter = 0
        for custom, order, day in self.data:
            if customer == custom and product == order:
                counter += 1
        return counter

    def get_never_ordered_per_customer(self, customer):
        order_list = []
        total_order = []

        for custom, order, day in self.data:
            total_order.append(order)
            if (custom == customer):
                order_list.append(order)

        # https://www.geeksforgeeks.org/python-difference-two-lists/
        s = set(order_list)
        result = {x for x in total_order if x not in s}
        return result

    def get_days_never_visited_per_customer(self, customer):
        day_list = []
        total_day = []

        for custom, order, day in self.data:
            total_day.append(day)
            if (custom == customer):
                day_list.append(day)

        # https://www.geeksforgeeks.org/python-difference-two-lists/
        s = set(day_list)
        result = {x for x in total_day if x not in s}
        return result

    def get_busiest_day(self):
        day_list = []
        for customer, order, day in self.data:
            day_list.append(day)

        return max(set(day_list), key=day_list.count)

    def get_least_busy_day(self):
        day_list = []
        for customer, order, day in self.data:
            day_list.append(day)

        return min(set(day_list), key=day_list.count)
