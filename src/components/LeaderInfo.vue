<template>
  <div v-if="unit.artefact">
    <h4>
      Artefact -{{ unit.artefact.name }}
    </h4>
    <p>
      {{ unit.artefact.artefactDetails }}
    </p>
  </div>
  <v-divider thickness="3" />
  <div
    v-if="unit.commandAbilities"
    class="mt-5"
  >
    <h4 class="mb-2">
      Command Abilities
    </h4>
    <div
      v-for="ability of abilities"
      :key="ability.name"
      class="mb-5"
    >
      <h4>
        {{ ability.name }}
      </h4>
      <p>
        {{ ability.commandAbilityDetails }}
      </p>
    </div>
  </div>
  <v-divider thickness="3" />
  <div
    v-if="unit.commandTrait"
    class="mt-5"
  >
    <h4>
      Command Trait - {{ unit.commandTrait.name }}
    </h4>
    <p>
      {{ unit.commandTrait.commandTraitDetails }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'LeaderInfo',

  props: {
    unit: {
      type: Object,
      required: true,
    },
  },

  computed: {
    abilities() {
      if (Array.isArray(this.unit.commandAbilities)) {
        return this.unit.commandAbilities;
      }
      return [this.unit.commandAbilities];
    },
  },
};
</script>