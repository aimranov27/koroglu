<template>
  <v-tooltip bottom :max-width="maxWidth">
    <template v-slot:activator="{ on, attrs }">
      <v-icon
          :size="size"
          :color="color"
          dark
          v-bind="attrs"
          v-on="on"
      >
        {{icon}}
      </v-icon>
    </template>
    <span>{{hintText}}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "KluHint",
  props: {
    icon: {
      type: String,
      default() {
        return "mdi-information";
      },
    },
    color: {
      type: String,
      default() {
        return "primary";
      }
    },
    size: {
      type: String,
      default() {
        return "medium";
      }
    },
    maxWidth: {
      type: String,
      default() {
        return "300";
      }
    },
    hintText: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>