const Validator = require('validator')
const manageUndefined = require('./manageUndefined')

module.exports = function ValidateRegisteInput(data){

	data.name = manageUndefined(data.name)?data.name:''
	data.email = manageUndefined(data.email)?data.email:''
	data.password = manageUndefined(data.password)?data.password:''
	data.password2 = manageUndefined(data.password2)?data.password2:''

	let errors = {}

	if(Validator.isEmpty(data.name)){
		errors.name = 'User name required'
	}

	if(Validator.isEmpty(data.email)){
		errors.email = 'Email is required'
	}

	if(!Validator.isEmail(data.email)){
		errors.email = 'Valid email is required'
	}

	if(Validator.isEmpty(data.password)){
		errors.password = 'Password is required'
	}

	if(Validator.isEmpty(data.password2)){
		errors.password2 = 'Confirm password is required'
	}

	if(!Validator.equals(data.password, data.password2)){
		errors.password2 = 'Passwords must match'
	}

	return {
		errors,
		errorFlag:manageUndefined(errors)
	}

}