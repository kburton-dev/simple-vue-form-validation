const getStringValue = value => {
	return value === null ? '' : value.toString();
}
const getNumberValue = value => {
	return +value;
}

const validators = [
	{
		name: 'required',
		rule: (value, ruleValue) => {
			if (!ruleValue || getStringValue(value).length > 0)
				return true;
			return 'This field is required';
		}
	},
	{
		name: 'minlength',
		rule: (value, ruleValue) => {
			if (getStringValue(value).length >= ruleValue) {
				return true;
			}
			return `Needs to be longer than ${ruleValue} characters`;
		}
	},
	{
		name: 'maxlength',
		rule: (value, ruleValue) => {
			if (getStringValue(value).length <= ruleValue) {
				return true;
			}
			return `Cannot be longer than ${ruleValue} characters`;
		}
	},
	{
		name: 'pattern',
		rule: (value, ruleValue) => {
			let valid = getStringValue(value).match(ruleValue);

			return valid || `This value does not match the expected pattern`;
		}
	},
	{
		name: 'min',
		rule: (value, ruleValue) => {
			if (isNaN(value)) return "Please provide a valid numeric value";

			if (getNumberValue(value) >= ruleValue) {
				return true;
			}
			return `Needs to be greater than ${ruleValue}`;
		}
	},
	{
		name: 'max',
		rule: (value, ruleValue) => {
			if (isNaN(value)) return "Please provide a valid numeric value";

			if (getNumberValue(value) <= ruleValue) {
				return true;
			}
			return `Needs to be less than ${ruleValue}`;
		}
	},
];

const registerValidator = (name, rule, overrideExisting = false) => {
	let index = validators.findIndex(v => v.name == name);

	if (index == -1) {
		validators.push({ name, rule });
		return true;
	}

	if (overrideExisting) {
		validators[index].rule = rule;
		return true;
	}

	console.error(`Validator with name ${name} already exists, please use another name, or specify that you want to override an existing one using "registerValidator(ruleName, rule, true)"`);
	return false;
};

module.exports = { validators, registerValidator };