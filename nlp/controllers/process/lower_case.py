# convert the text to lower case
def execute(text):
    try:
        result = text.lower()
        return result
    except (Exception) as error:
        raise Exception('[lower_case] - error {0}'.format(error))
