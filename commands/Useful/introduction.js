const { SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('introduction')
		.setDescription('Provides useful information about DtgA for new users.')
		.addUserOption(option => option
			.setName('user')
			.setDescription('User to introduce')
			.setRequired(true)),

	async execute(interaction) {
		const userToIntroduce = interaction.options.getUser('user');
		await interaction.reply({
			content: `Welcome ${userMention(userToIntroduce.id)}! Let's provide you with a few resources to make sure you have everything you need to get you on your way.`,
			embeds: [{
				title: 'First check out our DtgA Website\'s Getting Started page to make sure you have everything you need',
				url: 'https://clonephaze.github.io/DtgA/GettingStarted/GettingsStarted.html',
				color: 0x85ffe1,
				thumbnail: { url: 'https://clonephaze.github.io/DtgA/SiteResources/DtgA-logo_Final-Gapless.webp' },
			},
			{
				title: 'Once youre done with that it\'s a good idea to read through the New Mechanics page on the site as well, it has a lot of useful information!',
				url: 'https://clonephaze.github.io/DtgA/NewMechanics/NewMechanics.html',
				color: 0x85ffe1,
				thumbnail: { url: 'https://clonephaze.github.io/DtgA/SiteResources/DtgA-logo_Final-Gapless.webp' },
			},
			{
				title: 'Finally, if you still need help please post your questions in our #dangerous-to-go-alone-redux channel. If it\'s a common enough issue I\'ll likely be there to help, and if I can\'t help then one our our team members will help as soon as they can!',
				url: 'https://discord.com/channels/930516653656129617/930518282740592650',
				color: 0x85ffe1,
				thumbnail: { url: 'https://media.discordapp.net/attachments/978056569994502184/1227730375850328094/Logo_Overlay.png?ex=666a1183&is=6668c003&hm=6b985a580402d8b9156b43502bd1ac6f1ccf8f4352bd35d358f70656464f0061&=&format=webp&quality=lossless&width=657&height=621' },
			}],
		});
	},
};