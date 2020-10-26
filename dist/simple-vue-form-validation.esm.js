//
//
//
//
//
//

/**
 * Emits a `beforeSubmit` event during submission, in order for inputs, textareas,
 * and selects, to know when validate themselves.
 */
var script = {
	name: 'ValidatedForm',
	methods: {
		checkValidity: function checkValidity() {
			var invalidEls = this.$el.getElementsByClassName('invalid');
			return invalidEls.length == 0;
		},
		submit: async function submit(event) {
			this.$el.dispatchEvent(new Event('beforeSubmit'));
			await this.$nextTick();

			if (this.checkValidity()) {
				this.$emit('submit', event);

				return;
			}

			this.$emit('validationFailed');
			event.stopPropagation();
			event.preventDefault();
		}
	}
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    { attrs: { novalidate: "" }, on: { submit: _vm.submit } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var validators = [
	{
		name: 'required',
		rule: function (value, ruleValue) {
			if (!ruleValue || (("" + (value === null ? '' : value)).length > 0))
				{ return true; }
			return 'This field is required';
		}
	},
	{
		name: 'minlength',
		rule: function (value, ruleValue) {
			if (value.length >= ruleValue) {
				return true;
			}
			return ("Needs to be longer than " + ruleValue + " characters");
		}
	},
	{
		name: 'maxlength',
		rule: function (value, ruleValue) {
			if (value.length <= ruleValue) {
				return true;
			}
			return ("Cannot be longer than " + ruleValue + " characters");
		}
	},
	{
		name: 'pattern',
		rule: function (value, ruleValue) {
			var valid;
			switch (ruleValue) {
				case 'email':
					valid = value.match(/\S{2,}\@\S{2,}\.\S{2,}/);
					break;
				default:
					console.log(("Unsupported validation pattern " + ruleValue));
					return;
			}

			return valid || ("This value does not match the " + ruleValue + " pattern");
		}
	},
	{
		name: 'min',
		rule: function (value, ruleValue) {
			if (value >= ruleValue) {
				return true;
			}
			return ("Needs to be greater than " + ruleValue);
		}
	},
	{
		name: 'max',
		rule: function (value, ruleValue) {
			if (value <= ruleValue) {
				return true;
			}
			return ("Needs to be less than " + ruleValue);
		}
	} ];

var registerValidator = function (name, rule, overrideExisting) {
	if ( overrideExisting === void 0 ) overrideExisting = false;

	var index = validators.findIndex(function (v) { return v.name == name; });

	if (index == -1) {
		validators.push({ name: name, rule: rule });
		return true;
	}

	if (overrideExisting) {
		validators[index].rule = rule;
		return true;
	}

	console.error(("Validator with name " + name + " already exists, please use another name, or specify that you want to override an existing one using \"registerValidator(ruleName, rule, true)\""));
	return false;
};

var validators_1 = { validators: validators, registerValidator: registerValidator };
var validators_2 = validators_1.validators;
var validators_3 = validators_1.registerValidator;

var RuleChecker = {
	validate: function validate(value, rulesStr) {
		var rules = rulesStr.split('|').filter(function (r) { return r; });

		var loop = function () {
			var ref = r.split(':');
			var rule = ref[0];
			var ruleValue = ref[1];
			var validator = validators_2.find(function (v) { return v.name == rule; });

			var validity = validator.rule(value, ruleValue || true);
			if (typeof validity == 'string') {
				return { v: validity };
			}
		};

		for (var r of rules) {
			var returned = loop();

			if ( returned ) return returned.v;
		}

		return true;
	}
};

/**
 * Thanks jed; https://gist.github.com/jed/982883
 */
function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, function (c) { return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16); }
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

	var errorMessage = document.getElementById(el.dataset.errorMessageId);
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
	var errorMessage = document.getElementById(el.dataset.errorMessageId);

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
	var value;

	if (el.value !== undefined) {
		value = el.value;
	} else if (vnode.componentInstance.value !== undefined) {
		value = vnode.componentInstance.value;
	} else {
		console.warn('Cannot validate `undefined` value. Either the vue component using the v-validate directive must contain a `value` property, or it must be bound to a native HTML element that has a `value` property.');
		return;
	}

	var isValid = RuleChecker.validate(value, el.dataset.validationRules);

	if (isValid === true) {
		setValid(el);
	} else {
		setInvalid(el, isValid);
	}
}

/**
 * Directive options
 */
var ValidationDirective = {
	install: function install(Vue) {
		Vue.mixin({
			directives: {
				'validate': {
					inserted: function (el, binding, vnode) {
						el.dataset.errorMessageId = 'error-message-' + uuidv4();
						el.dataset.validationRules = binding.value;

						el.addEventListener('change', function () { return runValidation(el, vnode); });

						var parentForm = el.closest('form');
						if (parentForm != null)
							{ parentForm.addEventListener('beforeSubmit', function () { return runValidation(el, vnode); }); }
					},
					update: function (el, binding) {
						el.dataset.validationRules = binding.value;
					}
				}
			}
		});
	}
};

function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('ValidatedForm', __vue_component__);
}

var plugin = {
	install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
	GlobalVue.use(ValidationDirective);
}

var wrapper = { ValidatedForm: __vue_component__, ValidationDirective: ValidationDirective, RegisterValidator: validators_3 };

var wrapper_1 = wrapper.ValidatedForm;
var wrapper_2 = wrapper.ValidationDirective;
var wrapper_3 = wrapper.RegisterValidator;

export { wrapper_3 as RegisterValidator, wrapper_1 as ValidatedForm, wrapper_2 as ValidationDirective, install };
