import models.article as article
import models.normalized_article as normalized_article

import controllers.process.lower_case as lower_case
import controllers.process.remove_numbers as remove_numbers
import controllers.process.remove_characters as remove_characters
import controllers.process.remove_whitespaces as remove_whitespaces
import controllers.process.remove_stopwords as remove_stopwords
import controllers.process.lemmatizer as lemmatizer
import controllers.process.remove_accents as remove_accents
import controllers.process.remove_words as remove_words
import controllers.process.remove_prepositions as remove_prepositions
import controllers.process.stemmer as stemmer
import controllers.process.text_distance as text_distance

# TODO mover a otra parte (quizas un enum)
ID = 0
LINK = 3
TEXT = 5

# execute nlp process
def execute():
    try:
        articles = article.find_all()

        for record in articles:
            print("[NLP] - normalizando articulo con ID {id} ".format(id=record[ID]))
            text = process_article(record)
            article.set_analyzed(record[ID])

    except (Exception) as error:
        print(error)

# applying the different filters to normalize the text
def process_article(article):
    try:
        if not article:
            return

        # first, persist article link for future updates
        print("[nlp] - guardando articulo {id} con su link original".format(id=article[ID]))
        normalized_article.create_article_link(article[LINK], article[ID])

        text = article[TEXT]
        text = lower_case.execute(text)
        text = remove_whitespaces.execute(text)

        print("[nlp] - guardando articulo {id} despues de aplicar: lower_case".format(id=article[ID]))
        normalized_article.update_lower_case(text, article[ID])

        text = remove_numbers.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: remove_numbers".format(id=article[ID]))
        normalized_article.update_removed_numbers(text, article[ID])

        text = remove_stopwords.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: remove_stopwords".format(id=article[ID]))
        normalized_article.update_removed_stopwords(text, article[ID])

        text = remove_accents.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: remove_accents".format(id=article[ID]))
        normalized_article.update_removed_accents(text, article[ID])

        text = remove_characters.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: remove_characters".format(id=article[ID]))
        normalized_article.update_removed_characters(text, article[ID])

        text = remove_words.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: remove_words".format(id=article[ID]))
        normalized_article.update_removed_words(text, article[ID])

        text = remove_prepositions.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: remove_prepositions".format(id=article[ID]))
        normalized_article.update_removed_prepositions(text, article[ID])

        lemmatized = lemmatizer.execute(text)
        print("[nlp] - guardando articulo {id} despues de aplicar: lemmatized".format(id=article[ID]))
        normalized_article.update_lemmatized(lemmatized, article[ID])

        stemmed = stemmer.execute(lemmatized)
        print("[nlp] - guardando articulo {id} despues de aplicar: stemmer".format(id=article[ID]))
        normalized_article.update_stemmer(stemmed, article[ID])

        text_distance.execute(stemmed, lemmatized)

        return stemmed
    except (Exception) as error:
        print(error)
