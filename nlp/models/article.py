import psycopg2
from database.connection import connect

def find_by_id(id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('SELECT * FROM ARTICLES WHERE id = {id}'.format(id=id))
        article = cur.fetchall()
        return article[0]
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
