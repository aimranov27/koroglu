<template>
      <v-navigation-drawer
          app
          v-model="navigation"
          class="grey lighten-2"
          :expand-on-hover="false"
          :mini-variant="false"
          :right="false"
          :permanent="true"
          absolute
      >
        <v-list
            dense
            nav
            class="py-0 mt-3"

        >
          <v-list-item
              v-for="item in menuItems"
              :key="item.title"
              link
              @click="routerTo(item.route)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppMenuLeft',
  props: {
    msg: String
  },
  data() {
    return {
      navigation: true,
      menuItems: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: {
            name: 'Home'
          }
        },
        {
          title: 'Analysis',
          icon: 'mdi-chart-bar',
          route: {
            name: 'Home'
          }
        },
        {
          title: 'Advertising Campaigns',
          icon: 'mdi-television-play',
          route: {
            name: 'AdvertisingCampaigns'
          }
        }
      ]
    }
  },
  methods: {
    routerTo(route) {
      this.$router.push(route);
    }
  }
}
</script>

