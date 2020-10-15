import configparser
import sys

config = configparser.ConfigParser()
config.read('configuration.ini')

# return configuration by name
def get_config(name):
    return config['DEFAULT'][name]
