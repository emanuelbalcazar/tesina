import models.article as article
import models.normalized_article as normalized_article

import controllers.process.lower_case as lower_case
import controllers.process.remove_numbers as remove_numbers
import controllers.process.remove_characters as remove_characters
import controllers.process.remove_whitespaces as remove_whitespaces
import controllers.process.remove_stopwords as remove_stopwords
import controllers.process.lemmatizer as lemmatizer
import controllers.process.remove_accents as remove_accents

# TODO mover a otra parte (quizas un enum)
ID = 0
LINK = 3

# execute nlp process
def execute():
    try:
        articles = article.find_all()

        for record in articles:
            print("[NLP] - normalizando articulo con ID {id} ".format(id=record[ID]))
            text = process_article(record)
            normalized_article.create(text, record[LINK], record[ID])
            article.set_analyzed(record[ID])

    except (Exception) as error:
        print(error)

# applying the different filters to normalize the text
def process_article(article):
    try:
        if not article:
            return

        text = article[5]
        text = lower_case.execute(text)
        text = remove_numbers.execute(text)
        text = remove_whitespaces.execute(text)
        text = remove_stopwords.execute(text)
        text = remove_accents.execute(text)
        text = remove_characters.execute(text)
        text = lemmatizer.execute(text)

        return text
    except (Exception) as error:
        print(error)
