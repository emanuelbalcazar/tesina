from flask import Flask
from config import get_config

# create flask app
app = Flask(__name__)

# default route for status
@app.route('/')
def hello():
    return 'NLP is running!'

## start the app
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=get_config('PORT'))