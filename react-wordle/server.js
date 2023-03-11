'use strict';
const log = console.log;

// Express
const path = require('path');
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./backend/db/mongoose');
const { User } = require('./backend/models/user')
const bcrypt = require('bcryptjs')
const session = require('express-session')

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(session({
    secret: 'secret',
    cookie: {
        expires: 1800000, 
        httpOnly: true
    }
}));

//auth middleware
const auth = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized Access")
		})
	} else {
		res.status(401).send("Unauthorized Access")
	}
}

// path to create user
app.post('/api/users', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
		log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}  
    
	const user = User({
		username: req.body.username,
		firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        totalGames: 0,
        wins: 0,
        losses: 0,
        winStreak: 0
	})

	try{
        const user2 = await User.find({ username: req.body.username }).exec();
        if(user2.length != 0){
            console.log(user2)
            res.status(400).send("bad request, user exists")
        }
        
        user.password = await new Promise((resolve, reject) => {
            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) reject(err)
                    resolve(hash)
                })
            })
        })

        log(user)
		res.send(await user.save())
	} catch(error){
		console.log(error)
		if (typeof error === 'object' && error !== null && error.name === "MongoNetworkError"){
			res.status(500).send("internal server error")
		}
		else{
			res.status(400).send("bad request")
		}
	}

})

// fetching data for all users
app.get('/api/users', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		console.log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}

	try {
        const users = await User.find()
		res.send(users)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})
// fetching data for any given username
app.get('/api/users/:username', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		console.log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}

	try {
        const user = await User.findOne({ username: req.params.username }).exec();
		if (!user) {
			res.status(404).send('Resource not found') 
		} else {
			res.send(user)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

app.delete('/api/users/:username', auth, async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		console.log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}
	try {
		if (!req.user.admin && !req.user.username === req.params.username){
			res.status(401).send("Unauthorized Access")
		}
		else{
			const user = await User.findOneAndRemove({ username: req.params.username }).exec();
			if (!user) {
				res.status(404).send('Resource not found')
			} else {   
				res.send(user)
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal server error')
	}
})
// login session
app.post('/api/users/login', async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		console.log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}

	try {
        const user = await User.findOne({ username: req.body.username }).exec();
		if (!user) {
			res.status(400).send('Resource not found') 
		} else {
            const res2 = await new Promise((resolve, reject) => {
                bcrypt.compare(req.body.password, user.password, (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
			// bad password
			if (!res2){
				res.status(401).send("bad password")
			}
			else{
				req.session.user = user._id
				if (user.admin){
					res.redirect('/AdminHome');
				}
				else{
					res.redirect('/RegularHome')
				}
            	// res.send({user: user, result: res2})
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

//edits logged in user
app.post('/api/users/edit', auth, async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		console.log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}

	try {
		// const user = await User.findOne({ username: req.params.username }).exec();
		const user = await User.findById(req.user)
		if (!user) {
			res.status(404).send('Resource not found') 
		} else {
            for (var key in req.body){
                if (key != 'username'){
                    user[key] = req.body[key]
                }
            }
            await user.save()
            res.send(user)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

//edits any user as admin
app.post('/api/users/edit/:username', auth, async (req, res) => {
	if (mongoose.connection.readyState != 1) {
		console.log('mongoose connection error')
		res.status(500).send('Internal server error')
		return
	}

	try {
		if (!req.user.admin){
			res.status(401).send("Unauthorized Access")
		}
		const user = await User.findOne({ username: req.params.username }).exec();
		if (!user) {
			res.status(404).send('Resource not found') 
		} else {
            for (var key in req.body){
                if (key != 'username'){
                    user[key] = req.body[key]
                }
            }
            await user.save()
            res.send(user)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error') 
	}
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

const port = process.env.PORT || 3000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
