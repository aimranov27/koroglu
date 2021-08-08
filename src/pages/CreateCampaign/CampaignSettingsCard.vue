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
            :value="campaign.campaignName"
            @input="updateProperty({'campaign.campaignName': $event})"
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
          <span class="mr-2">Bidding strategy</span>
          <klu-hint
              hint-text="Bidding strategy hint"
          ></klu-hint>
        </v-subheader>
        <v-select
            :value="campaign.selectedBiddingStrategy"
            @input="updateProperty({'campaign.selectedBiddingStrategy': $event})"
            :items="biddingStrategies"
            :hint="campaign.selectedBiddingStrategy ? campaign.selectedBiddingStrategy.hint : ''"
            item-text="name"
            item-value="value"
            return-object
            outlined
            readonly
            persistent-hint
        ></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="d-flex flex-column" align="center">
      <v-col cols="6">
        <v-row no-gutters class="d-flex flex-row align-center">
          <v-col cols="9">
            <v-subheader class="text-md-h5 grey--text text--darken-4 mr-5 ml-n4">
              <span class="mr-1">Enable budget optimization</span>
            </v-subheader>
          </v-col>
          <v-col cols="3">
            <v-switch
                color="deep-purple"
                :label="campaign.budgetOptimizationEnabled ? 'On' : 'Off'" class="float-end darken-3"
                  :input-value="campaign.budgetOptimizationEnabled"
                @change="updateProperty({'campaign.budgetOptimizationEnabled': $event})"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row no-gutters class="d-flex flex-row align-start">
          <v-col cols="9">
            <p class="text-start">
              Campaign budget optimization will distribute your
              budget across ad sets to get more results depending on
              your delivery optimization choices and bid strategy.
              You can control spending on each ad set.
            </p>
          </v-col>
        </v-row>
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
  name: "AdSetSettingsCard",
  components: {KluHint},
  data() {
    return {}
  },
  computed: {
    ...mapState("campaignModule", {
      campaign(state) {
        return state.campaign;
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