<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/q6xoMVH.png" alt="Project logo"></a>
</p>
<h3 align="center">Clone's Test Bot</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/Clonephaze/Clones-Test-Bot)](https://github.com/Clonephaze/Clones-Test-Bot/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/Clonephaze/Clones-Test-Bot/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Welcome to the Git repository for my Discord Bot
    <br> 
</p>


## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
- [✔ Prerequisites ](#-prerequisites-)
- [💻 Installing ](#-installing-)
- [🎈 Usage ](#-usage-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)
- [🎉 Acknowledgements ](#-acknowledgements-)

## 🧐 About <a name = "about"></a>

&nbsp;&nbsp;&nbsp;I designed this bot as a side project as a way to sharpen my JavaScript skills, and I just wanted a helpful bot that wouldn't cost me an arm and a leg to use. While serving as a platform to enhance the author's programming skills, the bot is intended to be a valuable asset when connected to any server. By integrating with the Wolfram Alpha API and ChatGPT API, it possesses the capability provide robust and powerful knowledge, resources, and more. Additionally, it has a couple automatic problem detections that will respond to users having common issues. With its potential for future growth and expansion, this bot aspires to become an increasingly versatile tool, offering an array of functionalities and contributing to an enriched Discord community experience.

## 🏁 Getting Started <a name = "getting_started"></a>

This guide will walk you through the process of using my setup script to get your your own instance of the bot up and running as easily and smoothly as possible! If you would rather use the manual install instructions, you can find them [HERE](./manualInstallInstructions.md). 

![Alt Text](https://i.imgur.com/vxPkm4Z.gif)

## ✔ Prerequisites <a name = "prerequisites"></a>

If you choose to use my setup script then it will install *all* of the necessary missing dependencies, get all your files ready, and leave you with a completely prepared environment for your bot!  

You will need to have already made a bot-account/application through discord. You can do so [HERE](https://discord.com/developers/applications). Afterwards youll need to invite your bot to whatever server you want it working in. Under your [Developer&nbsp;Portal](https://discord.com/developers/applications) open your application and on the left side chose OAuth2->URL Generator. In the "scopes" box choose "bot". In the permissions box that pops up choose the permissions you want. Copy the url at the bottom of the page and paste it into your address bar. 

This bot has 2 optional commands "/gpt" and "/wolfram" that will allow you to interact with the Wolfram Alpha API and ChatGPT API respectively, but you will need your own API keys to use them. Because of this you can skip these keys entirely if you wish when prompted by my script. 

## 💻 Installing <a name = "installing"></a>

 If you've gotten your bot token and are ready to install the bot, you can download the install script [HERE](https://github.com/Clonephaze/Clones-Test-Bot/releases/latest) and place it anywhere you would like you would like the folder for your bot to live! For instance, if placed in the Documents folder the bots folder will be located at: "Documents/Clones-Test-Bot".

You absolutely ***MUST RUN THE SCRIPT AS AN ADMINISTRATOR!*** It will not run properly without it. Right click the script and select "Run as Administrator". If prompted if you would like to proceed then choose to run anyway.

At this point the script will proceed to install all of the missing dependencies and download (clone) my entire git repository to the folder you placed the script in. Before we can wrap up however you will need to supply the following information for the bot to work:

- Your Discord bot token found [HERE](https://discord.com/developers/applications) *aplication->Bot->Bot Token*
- Your Application ID found [HERE](https://discord.com/developers/applications) *aplication->General Information->Application ID*
- Your Server ID found [HERE](https://support.discord.com/hc/en-us/articles/206346498) *Open discord application->Right click your server->Copy server ID*
- Your Wolfram Alpha API key *optional* 
- Your ChatGPT API key *optional*

After that last prompt it will close and you're left with a completely prepared environment for your bot! If you look inside "clones-test-bot" you'll see a file named "bot start.bat". So long as you gave your keys correctly then running that script will start up and log in your bot!


## 🎈 Usage <a name="usage"></a>

Now that you've logged in the bot in the console, open the Discord server the bot is connected to and type "/" in any text channel to bring up a list of commands!


## ⛏️ Built Using <a name = "built_using"></a>

- [Discord.js](https://discord.js.org/) - Powerful node.js library
- [Discordjs-ChatGPT](https://github.com/Elitezen/discordjs-chatgpt/) - ChatGPT library for Discord.js
- [Chocolatey](https://chocolatey.org/) - Package manager, used for Setup Script

## ✍️ Authors <a name = "authors"></a>

- [@Clonephaze](https://github.com/Clonephaze)


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- [@kylelobo](https://github.com/kylelobo) -ReadMe Generator. Very useful as a template builder.
- [@torphedo](https://github.com/torphedo) -Told me how I could use batch scripts to install things that python could not. Ty sir.
