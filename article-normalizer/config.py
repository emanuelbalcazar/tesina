import configparser
import sys
from decouple import config

# return configuration by section and name
def get_config(name):
    return config(name)
