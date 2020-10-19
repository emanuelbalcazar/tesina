import psycopg2
from database.connection import connect

def create(text, link, article_id, ):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('INSERT INTO normalized_articles (body, link, article_id) VALUES (%s, %s, %s)', (text, link, article_id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        cur.execute("rollback")
