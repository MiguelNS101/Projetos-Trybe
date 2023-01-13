def is_palindrome_recursive(word, low_index, high_index):
    if word == "" or word is None:
        return False

    elif word[low_index] != word[high_index]:
        return False

    elif low_index == high_index:
        return True

    elif (low_index < high_index + 1):
        return is_palindrome_recursive(word, low_index+1, high_index-1)

    else:
        return True
