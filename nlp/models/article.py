import psycopg2
from database.connection import connect
from database.connection import disconnect

def find_by_id(id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('SELECT * FROM ARTICLES WHERE id = {id}'.format(id=id))
        article = cur.fetchall()
        return article[0]
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

def count():
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('SELECT COUNT(*) as count FROM ARTICLES WHERE analyzed = false')
        count = cur.fetchone();

        return count[0]
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

def find_all():
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('SELECT * FROM ARTICLES WHERE analyzed = false')
        articles = cur.fetchall();

        return articles
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

def get_by_limit(limit):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('SELECT * FROM ARTICLES WHERE analyzed = false LIMIT {limit}'.format(limit=limit))
        articles = cur.fetchall();

        return articles
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

def set_analyzed(id):
    try:
        conn = connect()
        cur = conn.cursor()
        cur.execute('UPDATE ARTICLES SET analyzed = %s WHERE id = %s', (True, id))
        conn.commit()
        return True
    except (Exception, psycopg2.DatabaseError) as error:
        cur.execute("rollback")
