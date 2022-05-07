<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>
        <slot name="title">
          {{ $route.name }}
        </slot>
      </v-app-bar-title>
      <template #append>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      position="right"
      temporary
    >
      <h1>test</h1>
    </v-navigation-drawer>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  data() {
    return {
      drawer: false,
    };
  },
};
</script>