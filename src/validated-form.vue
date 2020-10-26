<template>
	<form novalidate @submit="submit">
		<slot></slot>
	</form>
</template>

<script>
/**
 * Emits a `beforeSubmit` event during submission, in order for inputs, textareas,
 * and selects, to know when validate themselves.
 */
export default {
	name: 'ValidatedForm',
	methods: {
		checkValidity() {
			const invalidEls = this.$el.getElementsByClassName('invalid');
			return invalidEls.length == 0;
		},
		async submit(event) {
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
}
</script>