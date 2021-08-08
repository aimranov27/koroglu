<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-menu
          ref="dateFrom"
          v-model="dateFrom.menuDisplay"
          :close-on-content-click="false"
          :return-value.sync="dateFrom.value"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateFrom.value"
              :disabled="dateFrom.activatorDisabled"
              label="Date from"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>

        <v-date-picker
            v-model="dateFrom.value"
            no-title
            scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="dateFrom.menuDisplay = false"
          >
            Cancel
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="() => {
                $refs.dateFrom.save(dateFrom.value);
                dateTo.menuDisplay = true;
                dateTo.value = null;
              }"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="12" md="6">
      <v-menu
          ref="dateTo"
          v-model="dateTo.menuDisplay"
          :close-on-content-click="false"
          :return-value.sync="dateTo.value"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateTo.value"
              label="Date to"
              :disabled="!dateFrom.value"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-text-field>
        </template>

        <v-date-picker
            v-model="dateTo.value"
            :min="minDate"
            no-title
            scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="dateTo.menuDisplay = false"
          >
            Cancel
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.dateTo.save(dateTo.value)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DateRange",
  props: {
  },
  data() {
    return {
      dateFrom: {
        menuDisplay: false,
        activatorDisabled: false,
        value: null,
      },
      dateTo: {
        menuDisplay: false,
        activatorDisabled: false,
        value: null,
      }
    }
  },
  methods: {
    onSave() {

    },
  },
  computed: {
    minDate() {
      return this.dateFrom.value;
    }
  }
}
</script>

<style scoped>

</style>