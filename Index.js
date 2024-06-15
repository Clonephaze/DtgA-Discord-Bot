// Import required modules and packages
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes, ActivityType } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const sequelize = require('./sequelize');
const User = require('./models/User');

// Create a new Discord client with the Guilds intent
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages] });

// Create a collection to store commands and cooldowns
client.cooldowns = new Collection();
client.commands = new Collection();
const commands = [];

// Handle graceful shutdown
process.on('SIGINT', () => {
	console.log('Bot shutting down...');
	process.exit();
});

// Load command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			commands.push(command.data.toJSON());
		}
		else {
			console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Load event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Message keywords handling
const spamKeywords = ['you could win', 'chance to win', 'sign up now', 'you have been randomly selected', 'we are a fast growing', 'crypto giveaway'];
const messageLimit = 5;
const timeframe = 10000;
const userMessages = new Collection();

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	handleSpamKeywords(message);
	handleMessageRateLimit(message);
});

// Handle spam keywords
async function handleSpamKeywords(message) {
	const userId = message.author.id;

	if (spamKeywords.some(keyword => message.content.toLowerCase().includes(keyword))) {
		await message.delete();

		let user = await User.findOne({ where: { id: userId } });
		if (!user) {
			user = await User.create({ id: userId });
		}

		user.warnings += 1;
		await user.save();

		const warnings = user.warnings;

		if (warnings === 1) {
			await sendDirectMessage(message.author, 'Please do not spam. Your message was automatically deleted. You now have 1 warning.');
		}
		else if (warnings === 2) {
			await timeoutUser(message, userId, 15 * 60 * 1000, 'Your message was automatically deleted and you have been put in timeout for 15 minutes. You now have 2 warnings.');
		}
		else if (warnings === 3) {
			await timeoutUser(message, userId, 24 * 60 * 60 * 1000, 'Your message was automatically deleted and you have been put in timeout for 1 day. You now have 3 warnings.');
		}
		else if (warnings >= 4) {
			await banUser(message, userId, 'Your message was automatically deleted and you have been permanently banned for repeated spamming.');
		}
	}
}

// Handle message rate limit
function handleMessageRateLimit(message) {
	const now = Date.now();
	const userId = message.author.id;

	if (!userMessages.has(userId)) {
		userMessages.set(userId, []);
	}

	const userMessageLog = userMessages.get(userId);
	userMessageLog.push({ timestamp: now, message });
	userMessages.set(userId, userMessageLog.filter(msg => now - msg.timestamp < timeframe));

	if (userMessageLog.length >= messageLimit) {
		userMessageLog.forEach(msg => msg.message.delete().catch(console.error));
		sendDirectMessage(message.author, 'Please refrain from sending too many messages in a short period. (5 messages in 10 seconds) Your messages were automatically deleted.');
		userMessages.delete(userId);
	}
}

// Send a direct message to a user
async function sendDirectMessage(user, content) {
	try {
		await user.send(content);
	}
	catch (error) {
		console.error(`Failed to send DM to ${user.tag}:`, error);
	}
}

// Timeout a user
async function timeoutUser(message, userId, timeoutDuration, reason) {
	try {
		await message.guild.members.cache.get(userId).timeout(timeoutDuration, 'Spamming messages');
		await sendDirectMessage(message.author, reason);
	}
	catch (error) {
		console.error(`Failed to timeout ${message.author.tag}:`, error);
	}
}

// Ban a user
async function banUser(message, userId, reason) {
	try {
		await message.guild.members.ban(userId, { reason: 'Spamming messages' });
		await sendDirectMessage(message.author, reason);
	}
	catch (error) {
		console.error(`Failed to ban ${message.author.tag}:`, error);
	}
}

// Log in to Discord with the bot token
client.login(token);

// Register or update commands
client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setPresence({ activities: [{ name: 'around in Hyrule', type: ActivityType.Playing }], status: 'online' });

	const rest = new REST({ version: '10' }).setToken(token);

	try {
		console.log('[INFO] Refreshing command list.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('[INFO] Reloaded commands.');
	}
	catch (error) {
		console.error(error);
	}

	// Sync Sequelize models
	try {
		await sequelize.sync();
		console.log('Database synced');
	}
	catch (error) {
		console.error('Error syncing database:', error);
	}
});

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
	// Optionally, send a notification to a Discord channel
});

process.on('unhandledRejection', (error) => {
	console.error('Unhandled Rejection:', error);
	// Optionally, send a notification to a Discord channel
});