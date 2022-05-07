<template>
  <default-layout>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
            :src="require('@/assets/logo_aos.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>
        <v-col class="mb-4">
          <h1 class="font-weight-bold mb-3">
            Welcome to army manager
          </h1>

          <p class="subheading font-weight-regular">
            To continue please upload your first html roster file.
          </p>
        </v-col>

        <v-col
          class="mb-5"
          cols="12"
        >
          <input
            type="file"
            @change="readRosterFile"
          >
        </v-col>
      </v-row>
    </v-container>
  </default-layout>
</template>

<script setup>
  import useArmyListStore from '@/store/armyList';

  const armyListStore = useArmyListStore();
</script>

<script>
import DefaultLayout from "../layouts/Default.vue";

export default {
  name: 'WelcomePage',

  components: { DefaultLayout },

  emits: ['upload'],

  methods: {
    readRosterFile(event) {
      const file = event.target.files[0];
      if (!file) {
        throw new Error('Incorrect file');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const parser = new DOMParser();
        const rosterDom = parser.parseFromString(e.target.result, 'text/html');
        this.armyListStore.parseRoster(rosterDom);
        this.$router.push({ name: 'Armies' });
      };
      reader.readAsText(file);
    },
  },
};
</script>
