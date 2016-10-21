'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Photo', {
	imageName: {
		type: Number,
		required: true,
	},
	event: {
		type: String,
		required: true
	},
	location: {
		type: String
	},
	userId: {
		type: String,
		required: true
	}
})
