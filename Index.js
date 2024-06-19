// Import required modules and packages
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes, ActivityType } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const sequelize = require('./sequelize');
const User = require('./models/User');

// Create a new Discord client with required intents
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
/**
 * This function handles spam keywords in messages.
 * It checks if a message contains any of the spam keywords.
 * If it does, it deletes the message, increments the user's warning count,
 * and takes appropriate action based on the user's warning count.
 *
 * @param {Message} message - The message object received from the Discord API
 */
async function handleSpamKeywords(message) {
	const userId = message.author.id; // Get the ID of the user who sent the message
	if (spamKeywords.some(keyword => message.content.toLowerCase().includes(keyword))) {
		await message.delete();
		// Find the user in the database, or create a new one if it doesn't exist. Then increment their warning count
		let user = await User.findOne({ where: { id: userId } });
		if (!user) {
			user = await User.create({ id: userId });
		}
		user.warnings += 1;
		await user.save();

		// Take appropriate action based on the user's warning count
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

/**
 * This function handles the message rate limit for users.
 * It keeps track of the user's messages and deletes messages if the user
 * sends more than the allowed number of messages within a certain timeframe.
 * @param {Message} message - The message object received from the Discord API
 */
function handleMessageRateLimit(message) {
	const now = Date.now();
	const userId = message.author.id;

	// Check if the user's message log exists
	// If it doesn't, create an empty array for that user
	if (!userMessages.has(userId)) {
		userMessages.set(userId, []);
	}

	// Get the user's message log, add the current message to the log, and filter out messages that are older than the allowed timeframe
	const userMessageLog = userMessages.get(userId);
	userMessageLog.push({ timestamp: now, message });
	const filteredLog = userMessageLog.filter(msg => now - msg.timestamp < timeframe);
	userMessages.set(userId, filteredLog);

	// Check if the user has reached the allowed message limit, and if so, delete all the messages in the user's message log and send a direct message to the user explaining the limit and the deletion of their messages
	if (filteredLog.length >= messageLimit) {
		filteredLog.forEach(msg => msg.message.delete().catch(console.error));
		sendDirectMessage(message.author, 'Please refrain from sending too many messages in a short period. (5 messages in 10 seconds) Your messages were automatically deleted.');
		// Remove the user's message log from memory
		userMessages.delete(userId);
	}
}

/** Function for sending a direct message to a user
 * @param {User} user - The user to send the message to
 * @param {string} content - The content of the message
*/
async function sendDirectMessage(user, content) {
	try {
		await user.send(content);
	}
	catch (error) {
		console.error(`Failed to send DM to ${user.tag}:`, error);
	}
}

/** Function for timing out a user
 * @param {Message} message - The message object received from the Discord API
 * @param {string} userId - The ID of the user to timeout
 * @param {number} timeoutDuration - The duration of the timeout in milliseconds
 * @param {string} reason - The reason for the timeout
*/
async function timeoutUser(message, userId, timeoutDuration, reason) {
	try {
		await message.guild.members.cache.get(userId).timeout(timeoutDuration, 'Spamming messages');
		await sendDirectMessage(message.author, reason);
	}
	catch (error) {
		console.error(`Failed to timeout ${message.author.tag}:`, error);
	}
}


/** Function for banning a user
 * @param {Message} message - The message object received from the Discord API
 * @param {string} userId - The ID of the user to ban
 * @param {string} reason - The reason for the ban
*/
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

// Generic error handlers for uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (error) => {
	console.error('Unhandled Rejection:', error);
});