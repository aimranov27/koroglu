<template>
  <v-text-field
    :label="label"
    name="login"
    v-model="userLogin"
    :rules="rules"
    @input="emitLogin"
    type="text"
  />
</template>

<script>
export default {
  name: "SLogin",
  props: {
    value: String,
    label: {
      type: String,
      default: "Логин",
    },
    rules: {
      type: Array,
      default: function () {
        return [(value) => !!value || "Укажите Ваш логин"];
      },
    },
  },
  data: function () {
    return {
      userLogin: this.value,
    };
  },
  watch: {
    value: function (value) {
      this.userLogin = value;
    },
  },
  methods: {
    emitLogin(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style scoped></style>
