<template>
  <v-menu
      ref="date"
      v-model="display"
      :close-on-content-click="false"
      :return-value.sync="dateString"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="dateString"
          :disabled="activatorDisabled"
          label="Date from"
          prepend-inner-icon="mdi-calendar"
          readonly
          dense
          solo
          flat
          outlined
          hide-details
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>

    <v-date-picker
        v-model="dateString"
        :min="min"
        :max="max"
        no-title
        scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
          text
          color="primary"
          @click="display = false"
      >
        Cancel
      </v-btn>
      <v-btn
          text
          color="deep-purple"
          @click="() => {
            $refs.date.save(dateString);
            emit(dateString);
          }"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "KluDatePicker",
  props: {
    value: {
      type: String,
      default: "",
    },
    minDate: {
      type: String, // in ISO 8601
      default: null,
    },
    maxDate: {
      type: String, // in ISO 8601
      default: null,
    },
    fromNow: {
      type: Boolean,
      default: false,
    },
    untilNow: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      dateString: "",
      display: false,
      activatorDisabled: false,
    }
  },
  computed: {
    min() {
      return this.fromNow ? (new Date()).toISOString() : this.minDate;
    },
    max() {
      return this.untilNow ? (new Date()).toISOString() : this.maxDate;
    }
  },
  watch: {
    value(value) {
      this.dateString = value;
    }
  },
  methods: {
    emit(e) {
      this.$emit("input", e);
    }
  }
}
</script>

<style scoped>

</style>