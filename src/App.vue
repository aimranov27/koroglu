<template>
  <v-app>
    <app-header style="height: 64px"></app-header>
    <app-menu-left :style="{marginTop: '64px'}"></app-menu-left>
    <v-main>
      <v-container fluid style="overflow-y: auto; height: 910px" >
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppMenuLeft from "./components/AppMenuLeft";
import AppHeader from "./components/AppHeader";

export default {
  name: 'App',
  components: {
    AppMenuLeft,
    AppHeader
  },
  data() {
    return {}
  },
  created() {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  overflow-y: hidden;
}
</style>
