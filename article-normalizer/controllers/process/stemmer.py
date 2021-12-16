from nltk import word_tokenize
from nltk.stem import SnowballStemmer

stemmer = SnowballStemmer('spanish')

def execute(text):
    try:
        previousText = text
        stemmed_text = [stemmer.stem(i) for i in word_tokenize(text)]

        new_text = " "
        new_text = new_text.join(stemmed_text)

        return new_text
    except (Exception) as error:
        raise Exception('[stemmer] - error {0}'.format(error))
