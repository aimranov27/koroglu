<template>
        <v-app-bar
            app
            clipped-left
            class="grey lighten-3">
          <v-img
              src="../assets/eye.png"
              max-height="80"
              max-width="80"
              class="mr-6 mb-1"
          />
          <v-toolbar-title class="text-uppercase">
            Product.Name
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
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
        },
        {
          title: 'Analysis',
          icon: 'mdi-chart-bar',
        },
        {
          title: 'Advertising settings',
          icon: 'mdi-movie-open-settings',
        }
      ]
    }
  },
  methods: {}
}
</script>

