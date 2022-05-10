import psycopg2
import logging as log
from config import get_config

# get all connection parameters
host = get_config('DB_HOST')
port = get_config('DB_PORT')
database = get_config('DB_NAME')
user = get_config('DB_USER')
password = get_config('DB_PASSWORD')
sslmode = get_config('SSL_MODE')

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
