import RuleChecker from '../helpers/rule-checker';

/**
 * Thanks jed; https://gist.github.com/jed/982883
 */
function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

/**
 * Set invalid class on the control, and insert a span with the error message in to the DOM.
 *
 * @param {HTMLElement} el The HTMLElement to validate
 * @param {String} invalidMessage Invalid message to display
 */
function setInvalid(el, invalidMessage) {
	el.classList.add('invalid');

	let errorMessage = document.getElementById(el.dataset.errorMessageId);
	if (!errorMessage) {
		errorMessage = document.createElement('span');
		errorMessage.id = el.dataset.errorMessageId;
		errorMessage.classList.add('error-message');
		el.parentNode.insertBefore(errorMessage, el.nextSibling);
	}

	errorMessage.innerText = invalidMessage;
}

/**
 * Remove invalid class, and remove the error message span
 * @param {HTMLElement} el The HTMLElement
 */
function setValid(el) {
	el.classList.remove('invalid');
	const errorMessage = document.getElementById(el.dataset.errorMessageId);

	if (errorMessage) {
		errorMessage.parentNode.removeChild(errorMessage);
	}
}

/**
 * Execute the actual validation by iterating the validators and then breaking
 * early if one of them returns false.
 *
 * @param {HTMLElement} el The HTMLElement to validate
 * @param {VNode} vnode The virtual dom node
 * @param {Array} validators The provided validators
 */
function runValidation(el, vnode) {
	let value;

	if (el.value !== undefined) {
		value = el.value;
	} else if (vnode.componentInstance.value !== undefined) {
		value = vnode.componentInstance.value;
	} else {
		console.warn('Cannot validate `undefined` value. Either the vue component using the v-validate directive must contain a `value` property, or it must be bound to a native HTML element that has a `value` property.');
		return;
	}

	const isValid = RuleChecker.validate(value, el.dataset.validationRules);

	if (isValid === true) {
		setValid(el);
	} else {
		setInvalid(el, isValid);
	}
}

/**
 * Directive options
 */
const ValidationDirective = {
	install(Vue) {
		Vue.mixin({
			directives: {
				'validate': {
					inserted: (el, binding, vnode) => {
						el.dataset.errorMessageId = 'error-message-' + uuidv4();
						el.dataset.validationRules = binding.value;

						el.addEventListener('change', () => runValidation(el, vnode));

						const parentForm = el.closest('form');
						if (parentForm != null)
							parentForm.addEventListener('beforeSubmit', () => runValidation(el, vnode));
					},
					update: (el, binding) => {
						el.dataset.validationRules = binding.value;
					}
				}
			}
		});
	}
}

export default ValidationDirective;