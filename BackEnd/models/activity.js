'use strict';
const {	Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Activity extends Model {
		
		static associate(models) {
			
		}
	};
	Activity.init({
		name: DataTypes.STRING,
		content: DataTypes.TEXT,
		image: DataTypes.STRING
	}, {
		sequelize,
		paranoid: true,
		modelName: 'Activity',
	});
	return Activity;
};