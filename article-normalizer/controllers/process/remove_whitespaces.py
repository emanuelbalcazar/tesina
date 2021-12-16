# to remove leading and ending spaces
def execute(text):
    try:
        result = text.strip()
        return result
    except (Exception) as error:
        raise Exception('[remove_whitespaces] - error {0}'.format(error))
