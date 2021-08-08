<template>
  <v-container fluid>
    <v-row class="d-flex flex-row" align="center">
      <v-col :cols="12" md="6" class="text-start text-md-h5 font-weight-bold">
        {{campaignName}}
      </v-col>
    </v-row>
    <v-card flat>
      <v-stepper flat v-model="stepperCounter">
        <v-stepper-header>
          <v-stepper-step
              class="pl-0"
              color="deep-purple"
              :complete="stepperCounter > 1"
              :rules="[validCampaignCard]"
              step="1">
            Campaign settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              color="deep-purple"
              step="2"
              :complete="stepperCounter > 2"
              :rules="[validAdSettingCard]"
          >
            Ad sets settings
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              class="pr-0"
              color="deep-purple"
              step="3"
              :complete="stepperCounter > 3"
          >
            Media content
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content class="pa-0" step="1">
<!--            <ad-set-settings-card></ad-set-settings-card>-->
            <campaign-settings-card>
              <template slot="footer-buttons">
<!--                <v-btn v-if="stepperCounter > 1"-->
<!--                       @click="stepperCounter&#45;&#45;"-->
<!--                       class="mr-1"-->
<!--                >-->
<!--                  Back-->
<!--                </v-btn>-->
                <v-btn
                    color="deep-purple"
                    dark
                    @click="stepperCounter++"
                    :disabled="!validCampaignCard()"
                >
                  Next
                </v-btn>
              </template>
            </campaign-settings-card>
          </v-stepper-content>

          <v-stepper-content step="2" class="pa-0">
            <ad-set-settings-card>
              <template slot="footer-buttons">
                <v-btn @click="stepperCounter--"
                       class="mr-1"
                >
                  Back
                </v-btn>
                <v-btn
                    color="deep-purple"
                    dark
                    @click="stepperCounter++"
                >
                  Next
                </v-btn>
              </template>
            </ad-set-settings-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <ad-settings-card>
              <template slot="footer-buttons">
                <v-btn @click="stepperCounter--"
                       class="mr-1"
                >
                  Back
                </v-btn>
                <v-btn
                    color="deep-purple"
                    :class="publishDisabled ? 'black--text' : 'white--text'"
                    :disabled="publishDisabled"
                    @click="onPublish"
                >
                  Publish
                </v-btn>
              </template>
            </ad-settings-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

    </v-card>
  </v-container>
</template>

<script>
import AdSetSettingsCard from "./AdSetSettingsCard";
import CampaignSettingsCard from "./CampaignSettingsCard";
import validationRules from "../../mixins/validationRules";
import AdSettingsCard from "./AdSettingsCard";
import {mapState} from "vuex";
export default {
  name: "CreateCampaignPage",
  components: {AdSetSettingsCard, CampaignSettingsCard, AdSettingsCard},
  mixins: [
      validationRules,
  ],
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      dialog: this.value,
      stepperCounter: 1,

    }
  },
  watch: {
    value(value) {
      this.dialog = value;
    },
  },
  computed: {
    ...mapState("campaignModule", {
      campaignName(state) {
        return state.campaign.campaignName;
      }
    }),
    ...mapState("campaignModule", {
      newAdSet(state) {
        return state.campaign.adSets[0];
      }
    }),
    publishDisabled() {
      return !this.validCampaignCard() || !this.validAdSettingCard()
    },
  },
  methods: {
    emitDialog(e) {
      this.$emit("input", e);
    },
    validCampaignCard() {
      return !this.emptyString(this.campaignName);
    },
    validAdSettingCard() {
      return this.stepperCounter < 2 || !this.emptyString(this.newAdSet.name) &&
          this.newAdSet.dailyBudget > 0 &&
          !this.emptyString(this.newAdSet.dateFrom) &&
          !this.emptyString(this.newAdSet.timeFrom);
    },
    onPublish() {

    }
  }
}
</script>

<style scoped>

</style>