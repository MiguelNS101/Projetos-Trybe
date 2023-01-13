def quick_sort(strings, start, end):
    if start < end:
        p = partition(strings, start, end)
        quick_sort(strings, start, p - 1)
        quick_sort(strings, p + 1, end)


def partition(strings, start, end):
    pivot = strings[end]
    delimiter = start - 1

    for i in range(start, end):
        if strings[i] <= pivot:
            delimiter = delimiter + 1
            strings[i], strings[delimiter] = strings[delimiter], strings[i]

    strings[delimiter + 1], strings[end] = strings[end], strings[delimiter + 1]

    return delimiter + 1


def is_anagram(first_string, second_string):
    first_list = list(first_string.lower())
    second_list = list(second_string.lower())
    quick_sort(first_list, 0, len(first_list) - 1)
    quick_sort(second_list, 0, len(second_list) - 1)

    if (first_string == '' or second_string == ''):
        return False
    elif (first_list == second_list):
        return True
    else:
        return False
