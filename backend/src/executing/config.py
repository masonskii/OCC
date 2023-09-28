import configparser

config_path = "./config_com.ini"
# Create a ConfigParser object
cfg = configparser.ConfigParser()

# Read the .ini file
cfg.read(config_path)
