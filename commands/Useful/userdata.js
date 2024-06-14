const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const User = require('../../models/User');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userdata')
		.setDescription('Manage user data')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true))
		.addStringOption(option =>
			option.setName('action')
				.setDescription('Action to perform')
				.setRequired(true)
				.addChoices([
					{ name: 'View', value: 'view' },
					{ name: 'Reset Warnings', value: 'reset-warnings' },
					{ name: 'Add Warning', value: 'add-warning' },
					{ name: 'Remove Warning', value: 'remove-warning' },
				])),
	async execute(interaction) {
		const targetUser = interaction.options.getUser('target');
		const action = interaction.options.getString('action');

		let user = await User.findOne({ where: { id: targetUser.id } });
		if (!user) {
			user = await User.create({ id: targetUser.id });
		}

		switch (action) {
		case 'view': {
			const embed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setTitle(`${targetUser.username}'s Data`)
				.addFields(
					{ name: 'Warnings', value: user.warnings.toString(), inline: true },
					{ name: 'XP', value: user.xp.toString(), inline: true },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [embed], ephemeral: true });
			break;
		}
		case 'reset-warnings': {
			user.warnings = 0;
			await user.save();
			await interaction.reply({ content: `Reset warnings for ${targetUser.username}.`, ephemeral: true });
			break;
		}
		case 'add-warning': {
			user.warnings += 1;
			await user.save();
			await interaction.reply({ content: `Added a warning to ${targetUser.username}. They now have ${user.warnings} warnings.`, ephemeral: true });
			break;
		}
		case 'remove-warning': {
			if (user.warnings > 0) {
				user.warnings -= 1;
				await user.save();
				await interaction.reply({ content: `Removed a warning from ${targetUser.username}. They now have ${user.warnings} warnings.`, ephemeral: true });
			}
			else {
				await interaction.reply({ content: `${targetUser.username} has no warnings to remove.`, ephemeral: true });
			}
			break;
		}
		default: {
			await interaction.reply({ content: 'Unknown action.', ephemeral: true });
		}
		}
	},
};
