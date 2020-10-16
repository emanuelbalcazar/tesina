import models.article as article

import controllers.process.lower_case as lower_case
import controllers.process.remove_numbers as remove_numbers
import controllers.process.remove_characters as remove_characters
import controllers.process.remove_whitespaces as remove_whitespaces
import controllers.process.remove_stopwords as remove_stopwords

# run the nlp applying the different filters to normalize the text
def execute():
    try:
        record = article.find_by_id(1)
        text = process_article(record)

        print(text)
    except (Exception) as error:
        print(error)

# process only one article
def process_article(article):
    try:
        text = article[5]
        text = lower_case.execute(text)
        text = remove_numbers.execute(text)
        text = remove_characters.execute(text)
        text = remove_whitespaces.execute(text)
        text = remove_stopwords.execute(text)

        return text
    except (Exception) as error:
        print(error)
