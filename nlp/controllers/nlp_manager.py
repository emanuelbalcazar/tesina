import models.article as article

import controllers.process.lower_case as lower_case
import controllers.process.remove_numbers as remove_numbers
import controllers.process.remove_characters as remove_characters
import controllers.process.remove_whitespaces as remove_whitespaces
import controllers.process.remove_stopwords as remove_stopwords
import controllers.process.stemmer as stemmer
import controllers.process.lemmatizer as lemmatizer
import controllers.process.remove_accents as remove_accents

# execute nlp process
def execute():
    try:
        record = article.find_by_id(2)
        text = process_article(record)

        print(text)
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
        text = remove_characters.execute(text)
        text = remove_whitespaces.execute(text)
        text = remove_stopwords.execute(text)
        text = remove_accents.execute(text)
        #text = stemmer.execute(text)
        text = lemmatizer.execute(text)

        return text
    except (Exception) as error:
        print(error)
