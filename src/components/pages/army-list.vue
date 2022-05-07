<template>
  <default-layout>
    <v-list>
      <v-list-item v-for="(army, index) of armyList" :key="army.name">
        <router-link :to="{name: 'ViewArmy', params: { id: index }}">
          {{ army.name }}
        </router-link>
      </v-list-item>
    </v-list>
  </default-layout>
</template>

<script setup>
  import useArmyListStore from "@/store/armyList";
  import { storeToRefs } from "pinia";
  import _Inflector from "inflector-js";

  const store = useArmyListStore();
  const { armyList } = storeToRefs(store);

</script>

<script>
import DefaultLayout from "../layouts/Default.vue";

export default {
  name: 'ArmyListPage',

  components: {
    DefaultLayout,
  },
};
</script>