from nltk.tokenize import word_tokenize
import re

def execute(text):
    try:
        new_sentence = []
        words = word_tokenize(text)

        for word in words:
            word = re.sub('al$', '', word)
            new_sentence.append(word)

        new_text = " "
        new_text = new_text.join(new_sentence)

        return new_text
    except (Exception) as error:
        raise Exception('[remove_ending] - error {0}'.format(error))
