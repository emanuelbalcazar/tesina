import unidecode
import re

def execute(text):
    try:
        unaccented_string = unidecode.unidecode(text)

        return unaccented_string
    except (Exception) as error:
        raise Exception('[remove_accents] - error {0}'.format(error))
