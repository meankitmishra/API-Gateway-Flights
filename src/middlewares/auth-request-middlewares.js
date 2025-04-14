const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const { UserService } = require("../services");
const AppError = require("../utils/errors/app-error");

function validateAuthRequest(req, res, next) {
	if (!req.body.email) {
		errorResponse.message = "Something went wrong while authentication user";
		errorResponse.error = new AppError(
			["Email is not provided"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	if (!req.body.password) {
		errorResponse.message = "Something went wrong while authentication user";
		errorResponse.error = new AppError(
			["Password is not provided"],
			StatusCodes.BAD_REQUEST
		);
		return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
	}
	next();
}

async function checkAuth(req, res, next) {
	try {
		const response = await UserService.isAuthenticated(
			req.headers["x-access-token"]
		);
		if (response) {
			req.user = response;
			next();
		}
	} catch (error) {
		return res.status(error.statusCode).json(error);
	}
}

module.exports = {
	validateAuthRequest,
	checkAuth,
};
