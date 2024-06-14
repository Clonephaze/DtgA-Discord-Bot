const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},
	warnings: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	xp: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
});

module.exports = User;
