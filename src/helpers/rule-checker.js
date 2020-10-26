import { validators } from './validators';

export default {
	validate(value, rulesStr) {
		const rules = rulesStr.split('|').filter(r => r);

		for (let r of rules) {
			const [rule, ruleValue] = r.split(':');
			const validator = validators.find(v => v.name == rule);

			const validity = validator.rule(value, ruleValue || true);
			if (typeof validity == 'string') {
				return validity;
			}
		}

		return true;
	}
}