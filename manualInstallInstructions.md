**MANUAL INSTALL INSTRUCTIONS**

Before we can get started you will need to download and install NodeJS and create an account/application for your bot through discord. You can find your node version [HERE](https://nodejs.org/en/download/) and you can create your bot account [HERE](https://discord.com/developers/applications). You will also need python, and git installed.

Download the git repository [HERE](https://github.com/Clonephaze/DtgA-Discord-Bot/archive/refs/heads/main.zip) and place the folder titled "DtgA-Discord-Bot" inside whatever folder you would like the bot to live in.

After that, open the "DtgA-Discord-Bot" folder and open a command prompt window in that folder. The easiest way is to type "cmd" in the address bar. We're going to be installing the required libraries to make the bot and all commands work. 

Once there type the following command to install Discord.js and all of its dependencies:
```
npm install 
```
Only a few more steps to go! Now we need to edit some files. First, open up the "DtgA-Discord-Bot" directory, find "template-config.json", and rename the file to "config.json".

Open the file and edit each field with the appropriate key/token. You can get these from another team member who already has them.

The file should look like this  (these are not real tokens or ids, just examples):
```
{
  "token": "MTEwODc4LTAxOTIwMjEzMzYzNzkrMg.YZpXqJl.X7rWbVHhGdRmUoKfTQeBZQaPZiZ8tdeO-SC46y3nC8",
  "clientId": "1120581073702437723",
  "guildId": "1099275138450600030"
}
```

 Congratulations! You can launch the bot by double clicking the "bot start.bat" file!

