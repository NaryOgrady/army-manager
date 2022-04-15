<template>
  <v-row>
    <v-col offset=9>
      <slot />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-tabs show-arrows center-active v-model="selectedPhase">
        <v-tab v-for="phase of phases" :key="phase">
          {{ phase }} Phase
        </v-tab>
      </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PhasesView',

  data() {
    return {
      selectedPhase: 'hero',
      phases: [
        'hero',
        'movement',
        'shooting',
        'charge',
        'combat',
        'battleshock',
      ],
    };
  },
}
</script>
