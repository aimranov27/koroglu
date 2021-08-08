<template>
  <v-text-field
    :label="label"
    name="password"
    v-model="password"
    :rules="rules"
    @input="emitPassword"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    @click:append="showPassword = !showPassword"
  />
</template>

<script>
export default {
  name: "SPassword",
  props: {
    value: String,
    label: String,
    rules: Array,
  },
  data: function () {
    return {
      password: this.value,
      showPassword: false,
    };
  },
  watch: {
    value: function (value) {
      this.password = value;
    },
  },
  methods: {
    emitPassword(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style scoped></style>
