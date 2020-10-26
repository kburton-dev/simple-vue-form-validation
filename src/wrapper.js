import ValidatedForm from './validated-form.vue';
import ValidationDirective from './directives/validation';
import { registerValidator as RegisterValidator } from './helpers/validators';

export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('ValidatedForm', ValidatedForm);
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
	GlobalVue.use(ValidationDirective)
}

module.exports = { ValidatedForm, ValidationDirective, RegisterValidator };