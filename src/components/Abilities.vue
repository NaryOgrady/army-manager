<template>
  <div
    v-for="ability of unitAbilities"
    :key="ability.name"
    class="mb-5"
  >
    <h4>{{ ability.name }}</h4>
    <p>{{ ability.abilityDetails }}</p>
  </div>
</template>

<script>
export default {
  name: 'AbilitiesTable',

  props: {
    abilities: {
      type: Object,
      required: true,
    },
  },

  computed: {
    unitAbilities() {
      if (Array.isArray(this.abilities)) {
        return this.abilities;
      }
      return [this.abilities];
    },
  },
};
</script>
