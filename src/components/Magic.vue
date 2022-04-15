<template>
  <p><b>Cast/Unbind:</b> {{ unit.magic['cast/Unbind'] }}</p>
  <div v-for="spell of spells" :key="spell.name" class="mb-5">
    <div>
      <span class="mr-5">
        <b>{{ spell.name }}</b>
      </span>
      <span class="mr-5" v-if="spell.range">
        <b>Range:</b> {{ spell.range }} 
      </span>
      <span class="mr-5">
      <b>CV:</b> {{ spell.castingValue }}
      </span>
    </div>
    <p>{{ spell.description }}</p>
  </div>
</template>

<script>

export default {
  name: 'MagicTable',

  props: {
    unit: {
      type: Object,
      required: true,
    }
  },

  computed: {
    spells() {
      if (Array.isArray(this.unit.spell)) {
        return this.unit.spell;
      }
      return [this.unit.spell];
    }
  }
}
</script>
