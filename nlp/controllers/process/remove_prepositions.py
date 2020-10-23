import spacy

def execute(text):
    try:
        nlp = spacy.load('es_core_news_md')
        doc = nlp(text)
        new_sentence = []

        for token in doc:
            if token.pos_ == "ADJ" or token.pos_ == "VERB" or token.pos_ == "NOUN" or token.pos_ == "ADV" or token.pos_ == "AUX":
                new_sentence.append(token.text)

        new_text = " "
        new_text = new_text.join(new_sentence)

        return new_text
    except (Exception) as error:
        raise Exception('[remove_prepositions] - error {0}'.format(error))
