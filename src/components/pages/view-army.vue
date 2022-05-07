<template>
  <default-layout>
    <template #title>
      {{ army.name }}
    </template>
    <v-expansion-panels
      v-model="panels"
      multiple
    >
      <v-expansion-panel
        v-for="cat of army.categories"
        :key="cat"
        :value="cat"
      >
        <v-expansion-panel-title>
          {{ cat }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list>
            <template
              v-for="(unit, index) of unitsByCategory[cat]"
              :key="unit.name"
            >
              <router-link :to="{ name: 'ViewUnit', params: { unitId: index }}">
                <v-list-item active-color="primary">
                  {{ unit.name }}
                </v-list-item>
              </router-link>
              <v-divider />
            </template>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </default-layout>
</template>

<script setup>
  import { useArmy } from "@/functions/army";

  const army = useArmy();
</script>

<script>
import DefaultLayout from "../layouts/Default.vue";

export default {
  name: 'ViewArmy',

  components: { DefaultLayout },

  data() {
    return {
      dialog: true,
      panels: [...this.army.categories],
    };
  },

  computed: {
    unitsByCategory() {
      return this.army.categories.reduce((acc, curr) => {
        console.log(acc, curr);
        acc[curr] = this.army.units.filter(u => u.category === curr);
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
.unit-container {
  width: 100%;
}
</style>