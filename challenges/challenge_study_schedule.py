def study_schedule(permanence_period, target_time):
    counter = 0
    try:
        for hours in permanence_period:
            if hours[0] <= target_time and hours[1] >= target_time:
                counter += 1
        return counter

    except TypeError:
        return None
