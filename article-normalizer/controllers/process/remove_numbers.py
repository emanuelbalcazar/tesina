import re

# remove all numbers from text
def execute(text):
    try:
        result = re.sub(r'\d+', ' ', text)
        return result
    except (Exception) as error:
        raise Exception('[remove_numbers] - error {0}'.format(error))
