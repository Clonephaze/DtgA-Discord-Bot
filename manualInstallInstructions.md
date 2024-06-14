**AT THE MOMENT THIS IS SLIGHTLY CONFUSING AS IT WAS DIRECTLY PULLED FROM THE README ONCE THE SCRIPT WAS MADE. IT WILL BE MODIFIED TO MAKE SENSE IN THE FUTURE.**

Before we can get started you will at the very least need to download and install NodeJS and create an account/application for your bot through discord. You can find your node version [HERE](https://nodejs.org/en/download/) and you can create your bot account [HERE](https://discord.com/developers/applications).

Download the git repository [HERE](https://github.com/Clonephaze/Clones-Test-Bot/archive/refs/heads/main.zip) and place the folder titled "Clones-Test-Bot-main" inside whatever folder you would like the bot to live in.

After that, open the "Clones-Test-Bot-main" folder and open a command prompt window in that folder. The easiest way is to type "cmd" in the address bar. We're going to be installing the required libraries to make the bot and all commands work. 

Once there type the following command to install Discord.js
```
npm install 
```
Only a few more steps to go! Now we need to edit some files. First, open up the "Clones-Test-Bot-main" directory, find "template-config.json", and rename the file to "config.json".

Open the file and edit each field with the appropriate key/token being sure to *remove the brackets* {}. 

- Your Discord bot token found [HERE](https://discord.com/developers/applications) *aplication->Bot->Bot Token*
- Your Application ID found [HERE](https://discord.com/developers/applications) *aplication->General Information->Application ID*
- Your Server ID found [HERE](https://support.discord.com/hc/en-us/articles/206346498) *Open discord application->Right click your server->Copy server ID*
- Your Wolfram Alpha API key *optional* 

If you would like to use the ChatGPT command you will need to edit just one more file, if not feel free to move on to the last step! If so, go ahead and find the file in the base directory named "template.env", and rename it to ".env". Open the file and replace the entire "qouted" section, qoutes and all, with your API key. Dont forget to save!

Now lets invite your bot onto whatever server you're wanting your bot to run on. Under your [Developer&nbsp;Portal](https://discord.com/developers/applications) open your application and on the left side chose OAuth2->URL Generator. In the "scopes" box choose "bot". In the permissions box that pops up choose the permissions you want. I chose admin to keep it simple personally. Copy the generated URL at the bottom of the page and enter it into a browser you're signed in through to invite to the appropriate server. Follow the instructions on that screen.

 Congratulations! You can launch your bot by double clicking the "bot start.bat" file!

