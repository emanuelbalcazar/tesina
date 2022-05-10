import models.article as article
import models.normalized_article as normalized_article
from datetime import datetime

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
import controllers.process.remove_ends as remove_ends

from config import get_config
from .enum import Enum

# limit to process articles
LIMIT = int(get_config('LIMIT'))

# execute nlp process
def execute():
    try:
        total = article.count()
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[NLP] {now} - cantidad de articulos sin procesar: {total}".format(total=total, now=dt_string))

        count = 1

        while count <= total:
            articles = article.get_by_limit(LIMIT)
            process(articles, count, total)
            count = count + LIMIT

    except (Exception) as error:
        print("[execute]".error)

def process(articles, count, total):
    local_count = count

    for record in articles:
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
            print("\n[NLP] {now} - normalizando articulo con ID {id}, van: ({count}/{total}) ".format(id=record[Enum.ID], count=local_count, total=total, now=dt_string))
            text = process_article(record)
            article.set_analyzed(record[Enum.ID])
            local_count = local_count + 1

# applying the different filters to normalize the text
def process_article(article):
    try:
        if not article:
            return

        # first, persist article link for future updates
        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - guardando articulo {id} con su link original".format(id=article[Enum.ID], now=dt_string))
        normalized_article.create_article_link(article[Enum.LINK], article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: lower_case".format(id=article[Enum.ID], now=dt_string))
        text = article[Enum.TEXT]
        text = lower_case.execute(text)
        text = remove_whitespaces.execute(text)
        normalized_article.update_lower_case(text, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_numbers".format(id=article[Enum.ID], now=dt_string))
        text = remove_numbers.execute(text)
        normalized_article.update_removed_numbers(text, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_stopwords".format(id=article[Enum.ID], now=dt_string))
        text = remove_stopwords.execute(text)
        normalized_article.update_removed_stopwords(text, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_accents".format(id=article[Enum.ID], now=dt_string))
        text = remove_accents.execute(text)
        normalized_article.update_removed_accents(text, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_characters".format(id=article[Enum.ID], now=dt_string))
        text = remove_characters.execute(text)
        normalized_article.update_removed_characters(text, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_words".format(id=article[Enum.ID], now=dt_string))
        text = remove_words.execute(text)
        normalized_article.update_removed_words(text, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_prepositions".format(id=article[Enum.ID], now=dt_string))
        without_prepositions = remove_prepositions.execute(text)
        normalized_article.update_removed_prepositions(without_prepositions, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: lemmatized".format(id=article[Enum.ID], now=dt_string))
        lemmatized = lemmatizer.execute(without_prepositions)
        normalized_article.update_lemmatized(lemmatized, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: remove_ends".format(id=article[Enum.ID], now=dt_string))
        removed_endings = remove_ends.execute(lemmatized)
        normalized_article.update_remove_ends(removed_endings, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: stemmer".format(id=article[Enum.ID], now=dt_string))
        stemmed = stemmer.execute(removed_endings)
        normalized_article.update_stemmer(stemmed, article[Enum.ID])

        now = datetime.now()
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        print("[nlp] {now} - procesando articulo {id} con: text_distance".format(id=article[Enum.ID], now=dt_string))
        final_text = text_distance.execute(stemmed, lemmatized)
        normalized_article.update_word_cloud(final_text, article[Enum.ID])

        return final_text
    except (Exception) as error:
        print("[process_article]".error)
