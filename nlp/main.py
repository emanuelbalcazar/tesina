# main application module
# author: Emanuel Balcazar

from config import get_config
import controllers.nlp_manager as nlp

# import app configuration
host = get_config('APP', 'host')
port = get_config('APP', 'port')

## execute nlp process
nlp.execute()

