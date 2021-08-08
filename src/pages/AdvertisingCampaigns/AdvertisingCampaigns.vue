<template>
  <v-container fluid>
    <v-row class="d-flex flex-row" align="center">
      <v-col :cols="12" md="3" class="text-start text-md-h4 font-weight-bold">Campaigns</v-col>
      <v-col :cols="12" md="9" class="text-end">
        <span class="mr-1">Updated 5 minutes ago</span>
        <v-btn small class="mr-5" icon><v-icon>mdi-refresh</v-icon></v-btn>
        <v-btn small class="mr-5">Discard drafts</v-btn>
        <v-btn small class="mr-5">Review and Publish</v-btn>
        <v-btn small><v-icon>mdi-dots-horizontal</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-row" align="center">
      <v-col :cols="12" md="4" class="">
        <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col :cols="12" md="4">
        <date-range></date-range>
      </v-col>
    </v-row>

<!--    <v-stepper-header>-->
<!--      <v-toolbar-title class="text-uppercase">-->
<!--    <v-row>-->
      <v-tabs
          v-model="currentTab"
          background-color=""
          color="basil"
          grow
      >
        <v-tab
            v-for="tab in tabs"
            :key="tab.title"
        >
          {{ tab.title }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item
        >
          <v-card flat>
            <v-data-table
                v-model="campaignTable.selectedCampaigns"
                :headers="campaignTable.headers"
                :items="campaignTable.data"
                item-key="id"
                show-select
                class="elevation-1"
            ><template v-slot:top>
              <v-toolbar
                  flat
              >
<!--                <v-row class="d-flex flex-row">-->
                  <v-btn class="mr-3" small @click="onCreateAd">
                    <v-icon>mdi-plus</v-icon>
                    Create
                  </v-btn>
                  <v-btn class="mr-3" small>
                    <v-icon>mdi-file</v-icon>
                    Duplicate
                  </v-btn>
                  <v-btn class="mr-3" small>
                    <v-icon>mdi-delete</v-icon>
                    Delete
                  </v-btn>
<!--                </v-row>-->
              </v-toolbar>
            </template>
              <template v-slot:item.enabled="{ item }">
                <v-switch v-model="item.enabled">
                </v-switch>
              </template>
              <template v-slot:item.actions>
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="onCreateAd"
                >
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
<!--      <v-col :cols="12" md="8" id="map" style="height: 600px">-->

<!--      </v-col>-->
<!--    </v-row>-->
  </v-container>
<!--      </v-toolbar-title>-->
<!--    </v-stepper-header>-->
</template>

<script>
import DateRange from "../../components/DateRange";
export default {
  name: "AdvertisingCampaigns",
  components: { DateRange },
  data() {
    return {
      currentTab: null,
      tabs: [
        {
          title: "Campaigns"
        },
        {
          title: "Ad set"
        },
        {
          title: "Ads"
        }
      ],
      campaignTable: {
        headers: [
          {
            text: "On/Off",
            value: "enabled",
            sortable: false,
          },
          {
            text: "Name",
            value: "name",
            sortable: false,
          },
          {
            text: "Status",
            value: "status",
            sortable: false,
          },
          {
            text: "Actions",
            value: "actions",
            sortable: false,
          },
        ],
        data: [
          {
            id: 1,
            enabled: true,
            name: "Add 1",
            status: "draft"
          },
          {
            id: 2,
            enabled: false,
            name: "Add 2",
            status: "actual"
          },
          {
            id: 3,
            enabled: true,
            name: "Add 3",
            status: "actual"
          },
          {
            id: 4,
            enabled: false,
            name: "Add 4",
            status: "draft"
          }
        ],
        selectedCampaigns: [],
      }
    }
  },
  mounted() {

  },
  methods: {
    onCreateAd() {
      this.$router.push({name: "CreateCampaign"})
    }
  }
}
</script>

<style scoped>

</style>