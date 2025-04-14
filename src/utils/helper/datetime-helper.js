function compareTime(time1, time2) {
	let datetime1 = new Date(time1);
	let datetime2 = new Date(time2);

	if (datetime1 >= datetime2) {
		return false;
	}
	return true;
}

module.exports = {
	compareTime,
};
