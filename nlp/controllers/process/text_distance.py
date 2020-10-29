import textdistance
from nltk import word_tokenize

# stemm = short word, lemma = long word
def execute(stemmed_text, lemmatized_text):
    try:

        lemmatized_words = word_tokenize(lemmatized_text)
        stemmed_words = word_tokenize(stemmed_text)

        final_text = []

        # iterate all lemmas
        for lemma in lemmatized_words:

            min_distance = 10
            current_word = ''

            # for each stemm, calculate distance
            for stemm in stemmed_words:
                distance = textdistance.hamming(stemm, lemma)

                # only keep words with min distance
                if distance < min_distance:
                    min_distance = distance
                    current_word = lemma
                    print(distance, stemm, lemma)

            final_text.append(current_word)

        result = ' '.join(final_text)

        print(lemmatized_text)
        print("")
        print(result)

        return result
    except (Exception) as error:
        raise Exception('[text_distance] - error {0}'.format(error))
