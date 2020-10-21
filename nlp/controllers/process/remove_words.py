import json
import os

def execute(text):
    try:
        fileDir = os.path.dirname(os.path.realpath('__file__'))

        with open(os.path.join(fileDir, 'controllers/process/words.json')) as f:
            stopwords = json.load(f)

        text = text.split()
        resultwords  = [word for word in text if word.lower() not in stopwords]
        result = ' '.join(resultwords)

        return result
    except (Exception) as error:
        raise Exception('[remove_words] - error {0}'.format(error))
