const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const keys = require('../../config/keys')
const models = require('../../models/User')
const validateRegisterInput = require('../../validations/register')

router.post('/register', (req, res) => {

	console.log(validateRegisterInput(req.body))
	const {errors, errorFlag} = validateRegisterInput(req.body)

	if(errorFlag){
    return res.status(400).json(errors)
  }

	User.findOne({email:req.body.email})
	.then((user) => {
		if(user){
			return res.status(400).json({"message":"User already exists"})
		} else {
			const newUser = new User({
				name:req.body.name,
				email:req.body.email,
				password:req.body.password
			})

			bcrypt.genSalt(10, (err, salt)=>{
				bcrypt.hash(newUser.password, salt, (err, hash)=>{
					if(err){
						cosole.log(err)
					}
					newUser.password = hash

					newUser.save()
					.then(user => res.json(user))
					.catch(err => console.log(err))
				})
			})
		}
	})
})

module.exports = router;