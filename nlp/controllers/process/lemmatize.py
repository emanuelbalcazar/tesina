from nltk import word_tokenize
from nltk.stem import WordNetLemmatizer

wnl = WordNetLemmatizer()

def execute(text):
    try:
        lemmatized_text = [wnl.lemmatize(i) for i in word_tokenize(text)]

        new_text = " "
        new_text = new_text.join(lemmatized_text)

        return new_text
    except (Exception) as error:
        raise Exception('[lematize] - error {0}'.format(error))
