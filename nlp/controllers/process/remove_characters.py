import re

# remove unnecessary characters
def execute(text):
    try:
        result = re.sub(r"[^a-zA-Z]+", " ", text)
        return result
    except (Exception) as error:
        raise Exception('[remove_characters] - error {0}'.format(error))
