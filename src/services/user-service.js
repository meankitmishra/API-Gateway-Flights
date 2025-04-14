const { UserRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Auth } = require("../utils/common");

const userRepository = new UserRepository();

async function createUser(data) {
	try {
		const user = await userRepository.create(data);
		return user;
	} catch (error) {
		console.log(error);
		if (
			error.name == "SequelizeValidationError" ||
			error.name == "SequelizeUniqueConstraintError"
		) {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});
			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Something went wrong while creating the user",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function signin(data) {
	try {
		const user = await userRepository.getUserByEmail(data.email);
		if (!user) {
			throw new AppError("No user found", StatusCodes.NOT_FOUND);
		}
		const passwordMatch = Auth.checkPassword(data.password, user.password);
		if (!passwordMatch) {
			throw new AppError("Password is invalid", StatusCodes.BAD_REQUEST);
		}
		const jwt = Auth.createToken({ id: user.id, email: user.email });
		return jwt;
	} catch (error) {
		console.log(error);
		if (error.statusCode == StatusCodes.BAD_REQUEST) {
			throw error;
		}
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw error;
		}
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

async function isAuthenticated(token) {
	try {
		if (!token) {
			throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
		}
		const response = Auth.verifyToken(token);
		const user = await userRepository.get(response.id);
		if (!user) {
			throw new AppError("No user found", StatusCodes.NOT_FOUND);
		}
		return user.id;
	} catch (error) {
		if (error instanceof AppError) throw error;
		if (error.name == "JsonWebTokenError") {
			throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
		}
		if (error.name == "TokenExpiredError") {
			throw new AppError("Expired JWT token", StatusCodes.BAD_REQUEST);
		}
		throw new AppError(
			"Something went wrong",
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
}

module.exports = {
	createUser,
	signin,
	isAuthenticated,
};
