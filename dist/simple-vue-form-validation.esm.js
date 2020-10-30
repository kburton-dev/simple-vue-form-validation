function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

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
    submit: function submit(event) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.$el.dispatchEvent(new Event('beforeSubmit'));

                _context.next = 3;
                return _this.$nextTick();

              case 3:
                if (!_this.checkValidity()) {
                  _context.next = 6;
                  break;
                }

                _this.$emit('submit', event);

                return _context.abrupt("return");

              case 6:
                _this.$emit('validationFailed');

                event.stopPropagation();
                event.preventDefault();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
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
    const options = typeof script === 'function' ? script.options : script;
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
    let hook;
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
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

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
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
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

var getStringValue = function getStringValue(value) {
  return value === null ? '' : value.toString();
};

var getNumberValue = function getNumberValue(value) {
  return +value;
};

var validators = [{
  name: 'required',
  rule: function rule(value, ruleValue) {
    if (!ruleValue || getStringValue(value).length > 0) return true;
    return 'This field is required';
  }
}, {
  name: 'minlength',
  rule: function rule(value, ruleValue) {
    if (getStringValue(value).length >= ruleValue) {
      return true;
    }

    return "Needs to be longer than ".concat(ruleValue, " characters");
  }
}, {
  name: 'maxlength',
  rule: function rule(value, ruleValue) {
    if (getStringValue(value).length <= ruleValue) {
      return true;
    }

    return "Cannot be longer than ".concat(ruleValue, " characters");
  }
}, {
  name: 'pattern',
  rule: function rule(value, ruleValue) {
    var valid = getStringValue(value).match(ruleValue);
    return valid || "This value does not match the expected pattern";
  }
}, {
  name: 'min',
  rule: function rule(value, ruleValue) {
    if (isNaN(value)) return "Please provide a valid numeric value";

    if (getNumberValue(value) >= ruleValue) {
      return true;
    }

    return "Needs to be greater than ".concat(ruleValue);
  }
}, {
  name: 'max',
  rule: function rule(value, ruleValue) {
    if (isNaN(value)) return "Please provide a valid numeric value";

    if (getNumberValue(value) <= ruleValue) {
      return true;
    }

    return "Needs to be less than ".concat(ruleValue);
  }
}];

var registerValidator = function registerValidator(name, rule) {
  var overrideExisting = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var index = validators.findIndex(function (v) {
    return v.name == name;
  });

  if (index == -1) {
    validators.push({
      name: name,
      rule: rule
    });
    return true;
  }

  if (overrideExisting) {
    validators[index].rule = rule;
    return true;
  }

  console.error("Validator with name ".concat(name, " already exists, please use another name, or specify that you want to override an existing one using \"registerValidator(ruleName, rule, true)\""));
  return false;
};

var validators_1 = {
  validators: validators,
  registerValidator: registerValidator
};
var validators_2 = validators_1.validators;
var validators_3 = validators_1.registerValidator;

var RuleChecker = {
  validate: function validate(value, rulesStr) {
    var rules = rulesStr.split('|').filter(function (r) {
      return r;
    });

    var _iterator = _createForOfIteratorHelper(rules),
        _step;

    try {
      var _loop = function _loop() {
        var r = _step.value;

        var _r$split = r.split(':'),
            _r$split2 = _slicedToArray(_r$split, 2),
            rule = _r$split2[0],
            ruleValue = _r$split2[1];

        var validator = validators_2.find(function (v) {
          return v.name == rule;
        });
        var validity = validator.rule(value, ruleValue || true);

        if (typeof validity == 'string') {
          return {
            v: validity
          };
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ret = _loop();

        if (_typeof(_ret) === "object") return _ret.v;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return true;
  }
};

/**
 * Thanks jed; https://gist.github.com/jed/982883
 */

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
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
          inserted: function inserted(el, binding, vnode) {
            el.dataset.errorMessageId = 'error-message-' + uuidv4();
            el.dataset.validationRules = binding.value;
            el.addEventListener('change', function () {
              return runValidation(el, vnode);
            });
            var parentForm = el.closest('form');
            if (parentForm != null) parentForm.addEventListener('beforeSubmit', function () {
              return runValidation(el, vnode);
            });
          },
          update: function update(el, binding) {
            el.dataset.validationRules = binding.value;
          }
        }
      }
    });
  }
};

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ValidatedForm', __vue_component__);
}
var plugin = {
  install: install
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

var wrapper = {
  ValidatedForm: __vue_component__,
  ValidationDirective: ValidationDirective,
  RegisterValidator: validators_3
};
var wrapper_1 = wrapper.ValidatedForm;
var wrapper_2 = wrapper.ValidationDirective;
var wrapper_3 = wrapper.RegisterValidator;

export { wrapper_3 as RegisterValidator, wrapper_1 as ValidatedForm, wrapper_2 as ValidationDirective, install };
