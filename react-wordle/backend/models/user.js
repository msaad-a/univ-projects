const mongoose = require('mongoose')

const User = mongoose.model('Student', {
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
    password: {
        type: String,
        required: true,
        minlength: 1
    },
	firstName: {
        type: String,
        required: true,
        minlength: 1
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1
    },
    age: {
        type: Number,
        required: true,
        minlength: 1
    },
    admin:{
        type: Boolean, 
        default: false
    },
    totalGames: {
        type: Number,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },
    winStreak: {
        type: Number,
        required: true
    },
    recentResult: {
        type: Boolean
    },
    recentNumGuesses:{
        type: Number
    }
})

module.exports = { User }