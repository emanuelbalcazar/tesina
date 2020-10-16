# remove unnecessary characters
def execute(text):
    try:
        # TODO separar los caracteres en otro lado donde se pueda configurar
        chars = [',', '.', ':', '-', '_', '(', ')']
        result = text.translate({ord(k): None for k in chars})
        return result
    except (Exception) as error:
        raise Exception('[remove_numbers] - error {0}'.format(error))
