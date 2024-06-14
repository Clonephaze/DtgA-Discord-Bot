const { SlashCommandBuilder, EmbedBuilder, userMention } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('instructions')
		.setDescription('Provides instructions based on the given set name.')
		.addStringOption(option =>
			option.setName('instruction-set-name')
				.setDescription('Type the name of the instructions you want to send')
				.setRequired(true)
				// .setAutocomplete(true))
				.addChoices(
					{ name: 'BCML Bug Old', value: 'bcml bug old' },
					{ name: 'BCML Bug', value: 'bcml bug' },
					{ name: 'Input List', value: 'input list' },
					{ name: 'Collision Actors', value: 'collision actors' },
				),
		)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to mention if needed')
				.setRequired(false),
		),
	async execute(interaction) {
		const instructionSetName = interaction.options.getString('instruction-set-name').toLowerCase();
		const user = interaction.options.getUser('user');

		let response;

		switch (instructionSetName) {
		case 'bcml bug old':
			response = new EmbedBuilder()
				.setColor([174, 235, 220])
				.setTitle('Instructions for fixing the BCML bug the old way')
				.setFields([
					{ name: 'Step 1', value: 'Press Windows + R and type `cmd` then press enter' },
					{ name: 'Step 2', value: 'Type `pip uninstall bcml --yes` and press enter' },
					{ name: 'Step 3', value: 'Type `del /Q "%localappdata%/bcml/merged"` and press enter' },
					{ name: 'Step 4', value: 'Type `pip install bcml==3.10.4` and press enter' },
					{ name: 'Step 5', value: 'Type `bcml` and press enter, once bcml is launched press Ctrl + m to remerge your mods' },
					{ name: 'Step 6', value: 'Attempt launching your game again. If the bug persists, please start back and step 1 and try again. This bug can be fixed the first time you try this fix, but sometimes it can take trying it 10+ times.' },
				])
				.setThumbnail('https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621');
			break;
		case 'bcml bug':
		case 'bcmlbug':
			response = new EmbedBuilder()
				.setColor([174, 235, 220])
				.setTitle('Instructions for fixing the BCML bug')
				.setFields([
					{ name: 'Step 1', value: 'Open BCML and uninstall the ReBorn and ReAnimated modules of DtgA.' },
					{ name: 'Step 2', value: 'Open BCML and **AT THE SAME TIME** install the ReBorn and ReAnimated modules of DtgA in a queued install.' },
					{ name: 'Step 3', value: 'Fix the load order of the mods so that dtga mods are below the Collision actor mod, then launch your game after bcml is done.' },
					{ name: 'Step 4', value: 'That should be it! If the bug persists, please let us know or use the `/instructions bcml bug old` command to see the old instructions instead.' },
				])
				.setThumbnail('https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621');
			break;
		case 'collision actors':
		case 'collision actor':
		case 'collact':
			response = new EmbedBuilder()
				.setColor([174, 235, 220])
				.setTitle('Instructions for installing Collision Actors')
				.setFields([
					{ name: 'Step 1', value: '[Download the Collision Actors mod from Gamebanana.](https://gamebanana.com/mods/307642)' },
					{ name: 'Step 2', value: 'Open BCML and install the Collision Actors mod, and since Collision Actors should be installed as a higher priority than DtgA no priority sorting should be required.' },
					{ name: 'Step 3', value: 'That should be it! If you continue to have issues please let us know!' },
				])
				.setThumbnail('https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621');
			break;
		case 'input list':
		case 'combo list':
		case 'inputs':
			response = new EmbedBuilder()
				.setColor([174, 235, 220])
				.setTitle('Input List for DtgA')
				.setFields([
					{ name: 'Coiled Sword', value: 'Crouch (L-Stick) + Attack (X)', inline: true },
					{ name: 'Magic Pouch', value: 'Crouch (L-Stick) + Activate (A)', inline: true },
					{ name: 'Spell Book', value: 'Dpad Down + Sprint (B)', inline: true },
					{ name: 'Twilight Mirror', value: 'Crouch (L-Stick) + Jump (Y)', inline: true },
					{ name: 'Mipha Jump (only in water)', value: 'Crouch (L-Stick) + Scope (R-Stick)', inline: true },
					{ name: 'Double Jump', value: 'Jump (Y) + Activate (A)', inline: true },
					{ name: 'Unlocked Dodge', value: 'Activate (A) + Sprint (B)', inline: true },
					{ name: 'Air dash', value: 'Jump (Y) + Attack (X)', inline: true },
					{ name: 'Estus Flask', value: 'Dpad Down + Activate (A)', inline: true },
					{ name: 'Paraglider', value: 'Dpad Down + Jump (Y)', inline: true },
					{ name: 'Flurry Rush', value: 'Dpad Down + Attack (X)', inline: true },
					{ name: 'Double Dodge', value: 'Dpad Down + Lock-on (ZL)', inline: true },
					{ name: 'Sink (Iron Boots Equipped, must be standing in water, NOT SWIMMING)', value: 'Activate (A) + LS Move', inline: true },
					{ name: 'Dive (Dive Boots Equipped, must be standing in water, NOT SWIMMING)', value: 'DPad Down + LS Move', inline: true },
					{ name: 'Remove Boots (must be swimming)', value: 'Crouch (L-Stick) + LS Move', inline: true },
				])
				.setThumbnail('https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621');
			break;
		// Add more cases as needed
		default:
			response = `Sorry, no instructions found for the set: ${instructionSetName}`;
			break;
		}

		if (response instanceof EmbedBuilder) {
			if (user) {
				await interaction.reply({ content: userMention(user.id), embeds: [response] });
			}
			else {
				await interaction.reply({ embeds: [response] });
			}
		}
		else {
			await interaction.reply({ content: response, ephemeral: true });
		}
	},
	// autocomplete: async (interaction) => {
	// 	const focusedValue = interaction.options.getFocused();
	// 	const choices = ['bcml bug old', 'bcml bug', 'collision actors', 'input list'];
	// 	const filtered = choices.filter(choice => choice.startsWith(focusedValue));
	// 	await interaction.respond(
	// 		filtered.map(choice => ({ name: choice, value: choice })),
	// 	);
	// },
};
