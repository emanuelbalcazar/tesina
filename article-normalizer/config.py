import configparser
import sys

## load configuration file
config = configparser.ConfigParser()
config.read('configuration.ini')

# return configuration by section and name
def get_config(section, name):

    if config.has_section(section):
        return config[section][name]
    else:
        raise Exception('Sección {0} no encontrada en el archivo de configuración'.format(section))
