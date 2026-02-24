function rollPenetrations(target, uncappedPV, cappedPV) {
	let penetrations = 0;
	let successes = 3;
	while (successes == 3) {
		successes = 0;
		for (let i = 0; i < 3; i++) {
			let diceRoll = random(1, 10) - 2;
			let totalModifier = 0;
			while (diceRoll == 8) {
				totalModifier += 8;
				diceRoll = random(1, 10) - 2;
			}
			totalModifier += diceRoll;
			let penRoll = totalModifier + Math.Min(uncappedPV, cappedPV);
			if (penRoll > target) {
				successes++;
			}
		}
		if (successes >= 1) {
			penetrations++;
		}
		uncappedPV -= 2;
	}
	return penetrations;
}

function random(min, max) {
	let range = max - min;
	return min + Math.floor(Math.random() * (range + 1));
}

function expectedPenetrations(av, bonus, maxBonus) {
	av = Number(av);
	bonus = Number(bonus);
	maxBonus = Number(maxBonus);
	let chanceFor = [1];
	let currChanceFor = 1;
	let chanceToContinue = 1;
	while (currChanceFor > .00001) {
		let effectiveBonus = Math.min(bonus, maxBonus);
		let neededRoll = av + 1 - effectiveBonus;
		currChanceFor = chanceForOneSuccess(neededRoll) * chanceToContinue;
		chanceToContinue *= chanceForThreeSuccess(neededRoll);
		chanceFor.push(currChanceFor);
		bonus -= 2;
	}
	let expectedPenetrations = 0;
	for (let i = 1; i < chanceFor.length; i++) {
		expectedPenetrations += chanceFor[i];
	}
	return expectedPenetrations.toPrecision(4);
}

function chanceToSucceed(neededRoll) {
	let startingNumber = -1;
	let interval = 8;

	if (neededRoll <= startingNumber) return 1;

	let normalizedRoll = neededRoll;
	let numIntervals = Math.floor(normalizedRoll / interval);
	let withinInterval = normalizedRoll % interval;

	let intervalChance = .1;
	if (numIntervals > 0) {
		let strChance = '0.';
		for (let i = 0; i < numIntervals; i++) {
			strChance += '9';
		}
		strChance += '1';
		intervalChance = Number(strChance);
	}
	let withinChance = withinInterval / Math.pow(10, numIntervals + 1);

	return 1 - (intervalChance + withinChance);
}

function chanceForOneSuccess(neededRoll) {
	let failChance = 1 - chanceToSucceed(neededRoll);
	return 1 - failChance * failChance * failChance;
}

function chanceForThreeSuccess(neededRoll) {
	let passChance = chanceToSucceed(neededRoll);
	return passChance * passChance * passChance;
}

function getModifier(attribute) {
	return Math.floor((attribute - 16) / 2);
}

class DiceRoll {
	averageRoll = 0;

	diceNum;
	diceCount;
	constructor(diceString) {
		let parts = diceString.split('d');
		this.diceNum = Number.parseInt(parts[1]);
		this.diceCount = Math.max(1, Number(parts[0]));
		this.averageRoll = ((this.diceNum / 2) + 0.5) * this.diceCount;
	}

	roll() {
		let result = 0;
		for (let i = 0; i < this.diceCount; i++) {
			result += random(1, this.diceNum);
		}
		return result;
	}
}

class Roll {
	tokens = [];

	averageRoll;
	constructor(string) {
		this.tokenize(string);
	}

	roll() {
		let storedOperation = '+';
		let total = 0;
		for (let token of this.tokens) {
			switch (typeof token) {
				case "string":
					storedOperation = token;
					break;
				case "number":
					total = storedOperation == '+' ? total + token : total - token;
					break;
				case "object":
					let roll = token.roll();
					total = storedOperation == '+' ? total + roll : total - roll;
					break;
			}
		}
		return total;
	}

	getAverage() {
		if (this.averageRoll != undefined) return this.averageRoll;
		let storedOperation = '+';
		let total = 0;
		for (let token of this.tokens) {
			switch (typeof token) {
				case "string":
					storedOperation = token;
					break;
				case "number":
					total = storedOperation == '+' ? total + token : total - token;
					break;
				case "object":
					let avg = token.averageRoll;
					total = storedOperation == '+' ? total + avg : total - avg;
					break;
			}
		}
		this.averageRoll = total;
		return total;
	}

	tokenize(rollString) {
		this.tokens = [];
		let parenStack = [];
		let currToken = '';
		for (let i = 0; i < rollString.length; i++) {
			let char = rollString[i];
			switch (char) {
				case '(':
					parenStack.push(i);
					break;
				case ')':
					let idx = parenStack.shift();
					currToken += this.evaluate(rollString.substring(idx + 1, i));
					break;
				case ' ':
					if (parenStack.length > 0) continue;
					if (currToken != '') this.addToken(currToken);
					currToken = '';
					break;
				case '+':
				case '-':
					if (parenStack.length > 0) continue;
					if (currToken != '') {
						this.addToken(currToken);
						currToken = '';
					}
					this.addToken(char);
					break;
				default:
					if (parenStack.length > 0) continue;
					currToken += char;
			}
		}
		if (currToken != '') this.addToken(currToken);
	}

	addToken(token) {
		let isDice = token.includes('d');
		let isModifier = !isNaN(token);
		if (isDice) {
			let roll = new DiceRoll(token);
			this.tokens.push(roll);
		} else if (isModifier) {
			this.tokens.push(Number(token));
		} else {
			this.tokens.push(token);
		}
	}

	evaluate(diceNumPart) {
		let num = 0;
		let numStr = '';
		let op = '+';
		let i = 0;
		while (i < diceNumPart.length) {
			if (diceNumPart[i] === ' ') { i++; continue; }
			if (!isNaN(diceNumPart[i])) { numStr += diceNumPart[i++]; continue; }
			switch (diceNumPart[i]) {
				case '+':
				case '-':
				case '*':
				case '/':
					switch (op) {
						case '+': num += Number.parseInt(numStr); break;
						case '-': num -= Number.parseInt(numStr); break;
						case '*': num *= Number.parseInt(numStr); break;
						case '/': num /= Number.parseInt(numStr); break;
					}
					op = diceNumPart[i++];
					numStr = '';
					break;
			}
		}
		switch (op) {
			case '+': num += Number.parseInt(numStr); break;
			case '-': num -= Number.parseInt(numStr); break;
			case '*': num *= Number.parseInt(numStr); break;
			case '/': num /= Number.parseInt(numStr); break;
		}
		return num;
	}
}

export {
	DiceRoll, Roll,
	getModifier, chanceForOneSuccess, chanceForThreeSuccess, chanceToSucceed, expectedPenetrations, rollPenetrations, random
};