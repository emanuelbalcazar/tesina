# main application module
# author: Emanuel Balcazar

from flask import Flask
from config import get_config
import controllers.nlp_manager as nlp

# create flask app
app = Flask(__name__)

# import app configuration
host = get_config('APP', 'host')
port = get_config('APP', 'port')

## execute nlp process
nlp.execute()

# default route for status
@app.route('/', methods=['GET'])
def hello():
    return 'NLP is running!'

# start the app
#if __name__ == '__main__':
    #app.run(host=host, port=port)
