import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

spanish_stopwords = stopwords.words('spanish')

# remove stop words from text (spanish)
def execute(text):
    new_sentence = []
    words = word_tokenize(text)

    for word in words:
        if word not in spanish_stopwords:
            new_sentence.append(word)

    new_text = " "
    new_text = new_text.join(new_sentence)

    return new_text
