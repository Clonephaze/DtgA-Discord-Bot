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
					{ name: 'introduction', value: 'introduction' },
					{ name: 'instructions', value: 'instructions' },
					{ name: 'help', value: 'help' },
					{ name: 'userdata', value: 'userdata' },
				),
		),
	async execute(interaction) {
		const commandName = interaction.options.getString('command_name');
		let replyContent;

		if (!commandName) {
			const genEmbed = new EmbedBuilder()
				.setTitle('How to use me!')
				.setDescription('This will be a list of all my commands and how to use them. You can also use `/help <command-name>` to get more detailed help with a specific command!')
				.addFields(
					{
						name: '**/introduction** <user>',
						value: 'This command will provide new users with a few resources to find some useful information to get started playing DtgA. This command as 1 required argument to tag the user that needs the introduction.',
						inline: false,
					},
					{
						name: '**/instructions** <instruction-set-name> *<user>*',
						value: 'This command can provide various custom lists of instructions to new users and has 2 arguments to work with.',
						inline: false,
					},
					{
						name: '**/userdata** <user> *<action>*',
						value: 'View and manage user data. This command requires the `Administrator` permission. This command has 2 arguments to work with.',
						inline: false,
					},
					{
						name: '**/help** *<command-name>*',
						value: 'Calls this list! You can also use `/help <command-name>` to get more detailed help with a specific command!',
						inline: false,
					},
				)
				.setColor([174, 235, 220]);
			replyContent = genEmbed;
		}
		else {
			// Handle individual commands
			switch (true) {
			case commandName === 'introduction':
			case commandName === '/introduction':
				replyContent = new EmbedBuilder()
					.setTitle('The /Introduction command')
					.setDescription('This command will provide new users with a few resources to find some useful information to get started playing DtgA. The <user> argument will tag the given user when the introduction is sent. The introduction will include a link to the DtgA website and a link to the New Mechanics page.')
					.setColor([174, 235, 220]);
				break;
			case commandName === 'instructions':
			case commandName === '/instructions':
				replyContent = new EmbedBuilder()
					.setTitle('The /Instructions command')
					.setDescription('This command will provide users with instructions based on the given instruction set name. There is one required argument for this command and one optional command, <instruction-set-name> and <user>. The <user> argument will tag the given user if desired when the instructions are sent. The <instruction-set-names> are listed below.')
					.addFields([
						{ name: '**bcml bug**', value: 'This will send users instructions on how to fix the classic BCML bug the new way. Alternate name(s) for calling this set: bcmlbug' },
						{ name: '**bcml bug old**', value: 'This will send users instructions on how to fix the classic BCML bug the old way.' },
						{ name: '**collision actors**', value: 'This will send users instructions for getting and installing the Collision Actors mod. Alternate name(s) for calling this set: collsion actor, collact' },
						{ name: '**input list**', value: 'This will send a list of all the inputs or combos for DtgA. Alternate name(s) for calling this set: combo list, inputs' },
					])
					.setColor([174, 235, 220]);
				break;
			case commandName === 'help':
			case commandName === '/help':
				replyContent = new EmbedBuilder()
					.setTitle('The /Help command')
					.setDescription('This will be a list of all my commands and how to use them. You can also use `/help <command-name>` to get more detailed help with a specific command!')
					.setColor([174, 235, 220]);
				break;
			case commandName === 'userdata':
			case commandName === '/userdata':
				replyContent = new EmbedBuilder()
					.setTitle('The /UserData command')
					.setDescription('This command will provide users with their current data. The <user> argument tells the command which user\'s data to focus on. The data will include warnings and xp, though xp is completely unimplemented at the moment.')
					.addFields(
						{ name: '**view**', value: 'View the data of the given user.' },
						{ name: '**reset-warnings**', value: 'Reset the warnings of the given user.' },
						{ name: '**add-warning**', value: 'Add a warning to the given user.' },
						{ name: '**remove-warning**', value: 'Remove a warning from the given user.' },
					)
					.setColor([174, 235, 220]);
				break;
			// Add more cases for other commands
			default:
				replyContent = new EmbedBuilder()
					.setTitle('Command not found!')
					.setDescription('Sorry, I don\'t know how to help with that. Try using `/help` to get a list of all available commands.')
					.setColor([174, 235, 220]);
			}
		}

		await interaction.reply({ embeds: [replyContent], ephemeral: true });
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
