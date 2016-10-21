'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Event', {
	eventName: {
		type: String,
		required: true,
	},
	photos: {
		type: [String]
	},
	location: {
		type: String
	}
})
