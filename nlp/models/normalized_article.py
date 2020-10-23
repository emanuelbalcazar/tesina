import psycopg2
from psycopg2 import sql
from database.connection import connect

def create_article_link(link, article_id ):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('INSERT INTO normalized_articles (link, article_id) VALUES (%s, %s)', (link, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print("error:", error)
        cur.execute("rollback")


def update_lower_case(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET lower_case = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_removed_numbers(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET removed_numbers = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_removed_stopwords(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET removed_stopwords = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_removed_accents(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET removed_accents = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_removed_characters(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET removed_characters = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_removed_words(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET removed_words = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_removed_prepositions(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET removed_prepositions = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_lemmatized(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET lemmatized = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")

def update_stemmer(text, article_id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE normalized_articles SET stemmer = %s WHERE article_id = %s', (text, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        cur.execute("rollback")
