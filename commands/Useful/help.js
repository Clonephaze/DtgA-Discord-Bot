const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Provides a list of all available commands.')
		.addStringOption(option =>
			option.setName('command_name')
				.setDescription('The name of the command you want help with.')
				.setRequired(false)
				// .setAutocomplete(true) taken out because I learned about .addChoices lol.
				.addChoices(
					{ name: 'Introduction', value: 'introduction' },
					{ name: 'Instructions', value: 'instructions' },
					{ name: 'Help', value: 'help' },
					{ name: 'Userdata', value: 'userdata' },
				),
		),
	async execute(interaction) {
		const commandName = interaction.options.getString('command_name');
		let replyContent;

		if (!commandName) {
			const genEmbed = new EmbedBuilder()
				.setTitle('How to use me!')
				.setDescription('Here is a list of all my commands and how to use them. You can also use `/help <command-name>` to get more detailed help with a specific command.')
				.addFields(
					{
						name: '**/introduction** <user>',
						value: 'Provides new users with resources to get started. This command requires one argument: the user to tag.',
						inline: false,
					},
					{
						name: '**/instructions** <instruction-set-name> *<user>*',
						value: 'Provides various custom instructions. Requires one argument and optionally another to tag a user.',
						inline: false,
					},
					{
						name: '**/userdata** <user> *<action>*',
						value: 'View and manage user data. Requires `Administrator` permission. Accepts two arguments.',
						inline: false,
					},
					{
						name: '**/help** *<command-name>*',
						value: 'Displays this list or detailed help for a specific command.',
						inline: false,
					},
				)
				.setColor([174, 235, 220])
				.setFooter({ text: 'Use /help <command-name> for more details on a specific command.' });
			replyContent = genEmbed;
		}
		else {
			switch (commandName) {
			case 'introduction':
				replyContent = new EmbedBuilder()
					.setTitle('The /Introduction Command')
					.setDescription('Provides new users with resources to get started in DtgA.')
					.addFields(
						{ name: 'Usage', value: '`/introduction <user>`', inline: true },
						{ name: 'Description', value: 'Tags the specified user and sends them useful resources.', inline: false },
						{ name: 'Example', value: '`/introduction @newuser`', inline: false },
					)
					.setColor([174, 235, 220]);
				break;
			case 'instructions':
				replyContent = new EmbedBuilder()
					.setTitle('The /Instructions Command')
					.setDescription('Provides instructions based on the given instruction set name.')
					.addFields(
						{ name: 'Usage', value: '`/instructions <instruction-set-name> [user]`', inline: true },
						{ name: 'Description', value: 'Sends detailed instructions for the specified instruction set.', inline: false },
						{ name: 'Examples', value: '`/instructions bcml bug`\n`/instructions input list @newuser`', inline: false },
						{ name: 'Available Sets', value: '• bcml bug\n• bcml bug old\n• collision actors\n• input list', inline: false },
					)
					.setColor([174, 235, 220]);
				break;
			case 'help':
				replyContent = new EmbedBuilder()
					.setTitle('The /Help Command')
					.setDescription('Displays a list of all available commands or detailed help for a specific command.')
					.addFields(
						{ name: 'Usage', value: '`/help [command-name]`', inline: true },
						{ name: 'Description', value: 'Provides general or specific help information.', inline: false },
						{ name: 'Example', value: '`/help instructions`', inline: false },
					)
					.setColor([174, 235, 220]);
				break;
			case 'userdata':
				replyContent = new EmbedBuilder()
					.setTitle('The /UserData Command')
					.setDescription('Manages and views user data.')
					.addFields(
						{ name: 'Usage', value: '`/userdata <user> [action]`', inline: true },
						{ name: 'Description', value: 'View and manage data for the specified user.', inline: false },
						{ name: 'Actions', value: '• view\n• reset-warnings\n• add-warning\n• remove-warning', inline: false },
						{ name: 'Example', value: '`/userdata @user view`', inline: false },
					)
					.setColor([174, 235, 220]);
				break;
			default:
				replyContent = new EmbedBuilder()
					.setTitle('Command not found!')
					.setDescription('Sorry, I don\'t know how to help with that. Try using `/help` to get a list of all available commands.')
					.setColor([174, 235, 220]);
				break;
			}
		}

		try {
			await interaction.reply({ embeds: [replyContent], ephemeral: true });
		}
		catch (error) {
			console.error('Error responding to interaction:', error);
		}
	},
	// autocomplete: async (interaction) => {
	// 	const focusedValue = interaction.options.getFocused();
	// 	const choices = ['introduction', 'instructions', 'help'];
	// 	const filtered = choices.filter(choice => choice.startsWith(focusedValue));
	// 	await interaction.respond(
	// 		filtered.map(choice => ({ name: choice, value: choice })),
	// 	);
	// },
};
