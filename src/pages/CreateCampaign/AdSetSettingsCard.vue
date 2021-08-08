<template>
  <v-container fluid class="d-flex flex-column py-0 pl-0 pr-2 mt-3 mr-3">
    <v-row no-gutters>
      <v-col cols="8">
        <v-card class="" flat>
          <v-card-text class="mb-n4">
<!--            <v-subheader class="text-md-h5 grey&#45;&#45;text text&#45;&#45;darken-4 mr-5 ml-n4">-->
<!--              <span class="mr-2">Specify ad set name</span>-->
<!--              <klu-hint-->
<!--                  hint-text="Campaign name hint"-->
<!--              ></klu-hint>-->
<!--            </v-subheader>-->
            <v-row no-gutters class="d-flex flex-column">
              <span class="text-start mb-1 black--text text-h6">Specify ad set name</span>
              <v-text-field
                  class="grey--text text--darken-1"
                  label="Ad set name"
                  :value="newAdSet.name"
                  @input="updateProperty({'campaign.adSets.0.name': $event})"
                  hide-details
                  solo
                  flat
                  outlined
                  dense
              ></v-text-field>
            </v-row>
          </v-card-text>
          <v-card-title class="mb-n2 black--text">Select geopositions</v-card-title>
<!--          <v-card-text id="map" style="height: 400px"></v-card-text>-->
          <v-card-text>
            <klu-map-box ref="mapbox" @area-created="onAreaCreated"></klu-map-box>
          </v-card-text>
          <v-card-text>
            <v-row no-gutters class="d-flex flex-row mt-n5 text-h6 text-start">
              <v-col cols="12">
                <span class="mb-1 black--text">Daily budget</span>
              </v-col>
              <v-col>
              <v-text-field
                  class="grey--text text--darken-1"
                  label="Ad set name"
                  :value="newAdSet.dailyBudget"
                  @input="updateProperty({'campaign.adSets.0.dailyBudget': $event})"
                  hide-details
                  solo
                  flat
                  outlined
                  dense
              >
                <template v-slot:append-outer>
                  <v-select
                      :value="newAdSet.selectedCurrency"
                      dense
                      solo
                      flat
                      outlined
                      hide-details
                      style="width: 70px; margin-top: -7px"
                      @input="updateProperty({'campaign.adSets.0.selectedCurrency': $event})"
                      :items="currencies"
                      item-text="label"
                      item-value="value"
                      return-object
                  >
                  </v-select>
                </template>
              </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="d-flex flex-row text-h6 text-start mt-2">
              <v-col cols="12">
                <span class="mb-1 black--text">Launching date</span>
              </v-col>
              <v-col cols="4" class="mr-3">
                <klu-date-picker
                    :value="newAdSet.dateFrom"
                    @input="updateProperty({'campaign.adSets.0.dateFrom': $event})"
                    from-now
                ></klu-date-picker>
              </v-col>
              <v-col cols="2">
                <v-text-field
                    :value="newAdSet.timeFrom"
                    @input="updateProperty({'campaign.adSets.0.timeFrom': $event})"
                    solo
                    outlined
                    dense
                    flat
                    type="time"
                    hide-details>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters class="d-flex flex-row text-h6 text-start">
              <v-col cols="12">
                <v-checkbox
                    :value="newAdSet.isFinite"
                    @change="updateProperty({'campaign.adSets.0.isFinite': Boolean($event)})"
                    label="Set finish date (optional)"
                    color="deep-purple"
                    hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row no-gutters
                   class="d-flex flex-row text-h6 text-start mt-3"
                   v-if="newAdSet.isFinite">
              <v-col cols="4" class="mr-3">
                <klu-date-picker
                    :value="newAdSet.dateTo"
                    @input="updateProperty({'campaign.adSets.0.dateTo': $event})"
                    from-now
                ></klu-date-picker>
              </v-col>
              <v-col cols="2" >
                <v-text-field
                    :value="newAdSet.timeTo"
                    @input="updateProperty({'campaign.adSets.0.timeTo': $event})"
                    solo
                    outlined
                    dense
                    flat
                    type="time"
                    class="transparent transparent--text"
                    hide-details>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card elevation="6" v-if="editingGeoData.length > 0">
          <v-card-title class="d-flex flex-row justify-space-between">
            <span class="">
              Geoposition info
            </span>
            <v-btn class=""
                   icon
                   @click="editingGeoData = null">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="2"></v-col>
              <v-col cols="5">longitude</v-col>
              <v-col cols="5">latitude</v-col>
            </v-row>
            <v-row no-gutters v-for="(coordinates, index) in editingGeoData" v-bind:key="index">
              <v-col cols="2">{{index + 1}}</v-col>
              <v-col cols="5">
                <v-text-field
                    dense
                    v-model="coordinates[0]"
                >
                </v-text-field>
              </v-col>
              <v-col cols="5">
                <v-text-field
                    dense
                    v-model="coordinates[1]">
                </v-text-field>
              </v-col>
            </v-row>
<!--            <v-row class="d-flex flex-row align-center justify-start">-->
<!--              <v-col cols="2">-->
<!--                <span class="text-start mb-1 black&#45;&#45;text text-md-subtitle-1">Lat:</span>-->
<!--              </v-col>-->
<!--              <v-col cols="4">-->
<!--                <v-text-field-->
<!--                    class="grey&#45;&#45;text text&#45;&#45;darken-1"-->
<!--                    label="Latitude"-->
<!--                    v-model="editingGeoData.latitude"-->
<!--                    hide-details-->
<!--                    solo-->
<!--                    flat-->
<!--                    outlined-->
<!--                    dense-->
<!--                ></v-text-field>-->
<!--              </v-col>-->
<!--              <v-col cols="2">-->
<!--                <span class="text-start mb-1 black&#45;&#45;text text-md-subtitle-1">Long:</span>-->
<!--              </v-col>-->
<!--              <v-col cols="4">-->
<!--                <v-text-field-->
<!--                    class="grey&#45;&#45;text text&#45;&#45;darken-1"-->
<!--                    label="Longitude"-->
<!--                    v-model="editingGeoData.longitude"-->
<!--                    hide-details-->
<!--                    solo-->
<!--                    flat-->
<!--                    outlined-->
<!--                    dense-->
<!--                ></v-text-field>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--            <v-row class="d-flex flex-row align-center">-->
<!--              <v-col cols="2">-->
<!--                <span class="text-start mb-1 black&#45;&#45;text text-md-subtitle-1">Radius:</span>-->
<!--              </v-col>-->
<!--              <v-col cols="4">-->
<!--                <v-text-field-->
<!--                    class="grey&#45;&#45;text text&#45;&#45;darken-1"-->
<!--                    label="Radius, m"-->
<!--                    v-model="editingGeoData.radius"-->
<!--                    hide-details-->
<!--                    solo-->
<!--                    flat-->
<!--                    outlined-->
<!--                    dense-->
<!--                ></v-text-field>-->
<!--              </v-col>-->
<!--            </v-row>-->
          </v-card-text>
          <v-card-actions class="d-flex flex-row justify-end">
            <v-btn color="gray" text @click="resetEditingGeoData">Reset</v-btn>
            <v-btn color="deep-purple" class="font-weight-bold" text>Save point</v-btn>
          </v-card-actions>
        </v-card>
        <v-card elevation="6" class="mt-3">
          <v-card-title class="justify-start">Audience definition</v-card-title>
          <v-card-text>
            <v-row no-gutters class="d-flex flex-row align-center">
              <v-col cols="9" class="text-start">
                <span>Space for graph</span>
              </v-col>
              <v-col cols="3">A sufficiently wide audience has been selected</v-col>
            </v-row>
            <v-row class="d-flex flex-column" align="center">
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" class="d-flex justify-start">
                <span>
                  Potential coverage: 35 000 000 people
                </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card elevation="6" class="mt-3">
          <v-card-title class="justify-start">Campaign predictions per day</v-card-title>
          <v-card-text>
            <v-row no-gutters class="d-flex flex-column">
              <span class="text-start mb-1 black--text text-h6">
                Coverage
              </span>
              <v-progress-linear
                  :value="coverageProgress"
                  background-color="grey lighten-3"
                  color="light-blue lighten-2"
                  class="v-progress-linear--rounded rounded-xl"
                  height="25"
              >
                <template v-slot:default>
                  <strong>275-794</strong>
                </template>
              </v-progress-linear>
            </v-row>
            <v-row no-gutters class="d-flex flex-column">
              <span class="text-start mb-1 black--text text-h6">
                Views
              </span>
              <v-progress-linear
                  :value="viewsProgress"
                  background-color="grey lighten-3"
                  color="light-blue lighten-2"
                  class="v-progress-linear--rounded rounded-xl"
                  height="25"
              >
                <template v-slot:default>
                  <strong>23-67</strong>
                </template>
              </v-progress-linear>
            </v-row>
            <v-row class="d-flex flex-column" align="center">
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="12" class="d-flex justify-start">
                <span>
                  Forecast precision depends on such parameters as past campaigns data,
                  specified daily budget, market data, targeting critera and ad placement.
                  Displayed values allow you estimate campaign efficiency for your budget,
                  but don't pretend to be a precise metrics</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column" align="center">
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <slot name="footer-buttons"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";
import KluDatePicker from "../../components/KluDatePicker";
import KluMapBox from "../../components/MapBox/KluMapBox";
export default {
  name: "AdSetSettingsCard",
  components: {KluMapBox, KluDatePicker},
  data() {
    return {
      coords: [54, 39],
      yMapPluginSettings: {
        apiKey: "edccb064-0d95-4105-9bb2-152fcae76a2d",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1"
      },
      dateFromMenu: {
        display: false,
        activatorDisabled: false,
      },
      editingGeoData: [],
      yandexMap: {
      },
    }
  },
  computed: {
    ...mapState("campaignModule", {
      newAdSet(state) {
        return state.campaign.adSets[0];
      }
    }),
    ...mapState("campaignModule", {
      currencies(state) {
        return state.currencies;
      }
    }),
    coverageProgress() {
      return 10;
    },
    viewsProgress() {
      return 15;
    },
    // isEditingGeodataEmpty() {
    //   return
    // }
  },
  mounted() {
    this.$ymaps.ready(this.init);
    this.resetEditingGeoData();
  },
  updated() {
    this.$refs.mapbox.drawMap();
  },
  methods: {
    ...mapActions("campaignModule", ["updateProperty"]),
    init() {
      // Создание карты.
      // this.yandexMap = new this.$ymaps.Map("map", {
      //   // Координаты центра карты.
      //   // Порядок по умолчанию: «широта, долгота».
      //   // Чтобы не определять координаты центра карты вручную,
      //   // воспользуйтесь инструментом Определение координат.
      //   center: [55.76, 37.64],
      //   // Уровень масштабирования. Допустимые значения:
      //   // от 0 (весь мир) до 19.
      //   zoom: 10
      // });
    },
    onAreaCreated(coordinates) {
      this.editingGeoData = coordinates;
    },
    resetEditingGeoData() {
      this.editingGeoData = []
    }
  }
}
</script>

<style scoped>

</style>