<template>
  <v-container fluid class="">
    <v-row no-gutters class="d-flex flex-column" align="center">
      <v-col cols="6">
        <v-subheader class="text-md-h5 grey--text text--darken-4 mr-5 ml-n4">
          <span class="mr-2">Campaign name</span>
          <klu-hint
              hint-text="Campaign name hint"
          ></klu-hint>
        </v-subheader>
        <v-text-field
            class="grey--text text--darken-1"
            label="Campaign name"
            v-model="editingAd.name"
            solo
            flat
            outlined
            dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex flex-column" align="center">
      <v-col cols="6">
        <v-subheader class="text-md-h5 grey--text text--darken-4 mr-5 ml-n4">
          <span class="mr-2">Media file</span>
          <klu-hint
              hint-text="Media file hint"
          ></klu-hint>
        </v-subheader>
        <v-file-input
            ref="mediaFileInput"
            label="File input"
            hide-input
            prepend-icon=""
            v-model="editingAd.mediaFile"
            color="deep-purple"
            outlined
            dense
        >
          <template v-slot:append-outer>
            <v-btn class="ml-n2"
            @click="$refs.mediaFileInput.$refs.input.click()">
              <v-icon>mdi-image-outline</v-icon>
              Add media file
            </v-btn>
          </template>
        </v-file-input>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex flex-column" align="center">
      <v-col cols="6">
        <v-subheader class="text-md-h5 grey--text text--darken-4 mr-5 ml-n4">
          <span class="mr-1">Duration of the show</span>
        </v-subheader>
        <v-slider
            v-model="editingAd.duration"
            class="align-center"
            color="deep-purple"
            :min="minDuration"
            :max="maxDuration"
            hide-details
        >
          <template v-slot:prepend class="d-flex flex-row align-center">
            <v-text-field
                v-model="editingAd.duration"
                solo
                outlined
                dense
                flat
                readonly
                hide-details
                single-line
                style="width: 50px"
            ></v-text-field>
            <span class="ml-1 mt-3">seconds</span>
          </template>
        </v-slider>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column" align="center">
      <v-col cols="6">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <slot name="footer-buttons">
        </slot>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import KluHint from "../../components/KluHint";
import {mapActions, mapState} from "vuex";
export default {
  name: "AdSettingsCard",
  components: {KluHint},
  data() {
    return {
      editingAd: {
        name: "Ad name",
        mediaFile: null,
        duration: 20,
      },
      minDuration: 10,
      maxDuration: 50,
    }
  },
  computed: {
    ...mapState("campaignModule", {
      adSet(state) {
        return state.campaign.adSets[0];
      }
    }),
    ...mapState("campaignModule", {
      biddingStrategies(state) {
        return state.biddingStrategies;
      }
    }),
  },
  mounted() {
    this.updateProperty({"campaign.selectedBiddingStrategy": this.biddingStrategies[0]});
  },
  methods: {
    ...mapActions("campaignModule", ["updateProperty"]),
  }
}
</script>

<style scoped>

</style>