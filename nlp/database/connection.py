import psycopg2
import logging as log
from config import get_config

# get all connection parameters
host = get_config('DATABASE', 'host')
port = get_config('DATABASE', 'port')
database = get_config('DATABASE', 'database')
user = get_config('DATABASE', 'user')
password = get_config('DATABASE', 'password')

_connection = None

# connect to database
def connect():
    global _connection

    if not _connection:
        try:
            _connection = psycopg2.connect(database=database, user=user, host=host, port=port, password=password)
            print('[PostgreSQL] - connectado a la base de datos con exito')
            return _connection
        except (Exception, psycopg2.DatabaseError) as error:
            print('[PostgreSQL] - error de conexión a la base de datos, error {0}'.format(error))