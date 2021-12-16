import psycopg2
import logging as log
from config import get_config

# get all connection parameters
host = get_config('DATABASE', 'host')
port = get_config('DATABASE', 'port')
database = get_config('DATABASE', 'database')
user = get_config('DATABASE', 'user')
password = get_config('DATABASE', 'password')
sslmode = get_config('DATABASE', 'sslmode')

_connection = None

# connect to database
def connect():
    global _connection

    if not _connection:
        try:
            _connection = psycopg2.connect(database=database, user=user, host=host, port=port, password=password, sslmode=sslmode)
            print('[PostgreSQL] - connectado a la base de datos con exito')
            return _connection
        except (Exception, psycopg2.DatabaseError) as error:
            print('[PostgreSQL] - error de conexión a la base de datos, error {0}'.format(error))

    else:
        return _connection

def disconnect():
    global _connection

    if _connection:
        print("Desconectando...")
        _connection.close()
