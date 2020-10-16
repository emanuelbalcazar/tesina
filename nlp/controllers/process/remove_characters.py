# remove unnecessary characters
def execute(text):
    try:
        chars = [',', '.', ':', '-', '_', '(', ')']
        result = text.translate({ord(k): None for k in chars})
        return result
    except (Exception) as error:
        raise Exception('[remove_numbers] - error {0}'.format(error))
