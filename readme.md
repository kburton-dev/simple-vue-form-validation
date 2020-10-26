# Simple Vue.js Form Validaiton #

A simple Vue.js form validator using a form wrapper component, and a custom validation directive.

## Installation ##

Via NPM:
```
npm install simple-vue-form-validator
```

## Usage ##

### Register Directive ###
```
import { ValidationDirective } from 'simple-vue-form-validation';
Vue.use(ValidationDirective);
```
### Add to your component ###
```
<template>
  <validated-form @submit.prevent="submit" @validationFailed="validationFailed">
    <!-- On native input/select/textarea -->
    <input v-validate="`required|minlength:4|maxlength:50`">

    <!-- On custom component (which must contain a `value` property) -->
    <form-control v-validate="`required|minlength:4|maxlength:50`" />

    <input type="submit">
  </validated-form>
</template>

<script>
import { ValidatedForm } from 'simple-vue-form-validation';

export default {
  name: 'ContactForm',
  components: { ValidatedForm },
  methods: {
    validationFailed(e) {
        // Handle failed validation event
    },
    submit(e) {
        // Handle submission of valid form
    }
  }
}
</script>

```

### Register Your Own Validators ###
```
import { RegisterValidator } from 'simple-vue-form-validation';

let overrideExistingValidator = false;
RegisterValidator('yourRuleName', (value, ruleValue) => {
  // compare value against your rule value, and return `true`
  // or a string describe the validation error
}, overrideExistingValidator);
```
```
<validated-form @submit.prevent="submit" @validationFailed="validationFailed">
  <input v-validate="`minlength:5|yourRuleName:value`" />
</validated-form>
```

## Built-in validators ##
* required
* minlength
* maxlength
* pattern
* min
* max