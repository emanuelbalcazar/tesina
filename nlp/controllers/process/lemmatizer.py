import spacy

def execute(text):
    try:
        nlp = spacy.load('es_core_news_md')
        text_normalized = ""
        doc = nlp(text)
        sents = list(doc.sents)

        for token in doc:
            text_normalized += token.lemma_ + " "

        return text_normalized
    except (Exception) as error:
        raise Exception('[lematize] - error {0}'.format(error))
