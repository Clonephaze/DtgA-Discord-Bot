import os
import json
import sys
import time
import ctypes

# Set the console window title
ctypes.windll.kernel32.SetConsoleTitleW("Installing Dependencies")

os.chdir("..")

# Run command to install dependencies
npm_install_command = "npm install"
os.system(npm_install_command)
        
def prompt_user(message):
    while True:
        user_input = input(message)
        user_input = user_input.strip()  # Remove leading/trailing whitespace

        # Validate input
        if user_input == '':
            print("Invalid input. Input cannot be empty.")
        elif ' ' in user_input:
            print("Invalid input. Input cannot contain spaces.")
        elif '"' in user_input or "'" in user_input:
            print("Invalid input. Input cannot contain quote symbols.")
        else:
            return user_input
        
# Set the console window title
ctypes.windll.kernel32.SetConsoleTitleW("Creating Config.json, awaiting user input...")

# Edit and rename template-config.json
template_config_filename = 'template-config.json'
config_filename = 'config.json'

# Edit template-config.json
try: 
    with open(template_config_filename, 'r') as template_file:
        template_data = json.load(template_file)

    template_data['token'] = prompt_user('Enter your Discord bot token: ')
    template_data['clientId'] = prompt_user('Enter your application\'s client ID: ')
    template_data['guildId'] = prompt_user('Enter your server ID: ')

    with open(config_filename, 'w') as config_file:
        json.dump(template_data, config_file, indent=2)
except FileNotFoundError:
    print(f"File not found: {template_config_filename}. Terminating...")
    time.sleep(5)
    sys.exit(1)
except json.JSONDecodeError as e:
    print(f"Error while parsing JSON in {template_config_filename}: {e}. Terminating...")
    time.sleep(5)
    sys.exit(1)
except IOError as e:
    print(f"Error while reading or writing files: {e}. Terminating...")
    time.sleep(5) 
    sys.exit(1)

# Set the console window title
# ctypes.windll.kernel32.SetConsoleTitleW("Creating .env, awaiting user input...")

# # Edit template.env
# template_env_filename = 'template.env'
# env_filename = '.env'

# try:
#     with open(template_env_filename, 'r') as template_env_file:
#         template_env_data = template_env_file.read()

#     with open(env_filename, 'w') as env_file:
#         env_file.write(template_env_data)
# except FileNotFoundError:
#     print(f"File not found: {template_env_filename}. Terminating...")
#     time.sleep(5) 
#     sys.exit(1)
# except IOError as e:
#     print(f"Error while reading or writing files: {e}. Terminating...")
#     time.sleep(5) 
#     sys.exit(1)

# # Delete template files
# try:
#     os.remove(template_config_filename)
#     os.remove(template_env_filename)
# except FileNotFoundError:
#     pass  # The files may have been deleted already

os.chdir("..")

# Delete the install.bat file or the "Complete.Bot.Setup.bat" file
installScript = 'Complete.Bot.Setup.bat'
installScriptSecondary = 'install.bat'
try:
    if os.path.exists(installScript):
        os.remove(installScript)
    if os.path.exists(installScriptSecondary):
        os.remove(installScriptSecondary)
except OSError as e:
    print(f"Error while deleting files: {e}. Terminating...")
    time.sleep(5) 
    sys.exit(1)
