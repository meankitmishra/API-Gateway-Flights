const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { errorResponse, successResponse } = require("../utils/common");

async function createUser(req, res) {
	try {
		const user = await UserService.createUser({
			email: req.body.email,
			password: req.body.password,
		});
		successResponse.data = user;
		successResponse.message = "Created a user Successfully";
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		console.log(error);
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while creating the user";
		return res.status(error.statusCode).json(errorResponse);
	}
}

async function signin(req, res) {
	try {
		const user = await UserService.signin({
			email: req.body.email,
			password: req.body.password,
		});
		successResponse.data = user;
		successResponse.message = "signed in the user Successfully";
		return res.status(StatusCodes.CREATED).json(successResponse);
	} catch (error) {
		console.log(error);
		errorResponse.error = error;
		errorResponse.message = "Something went wrong while signing the user";
		return res.status(error.statusCode).json(errorResponse);
	}
}

module.exports = {
	createUser,
	signin,
};
