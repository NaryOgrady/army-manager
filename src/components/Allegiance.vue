<template>
    <v-row>
      <v-col>
        <div class="d-flex">
          <h2 class="flex-grow-1">Allegiance</h2>
          <slot />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels variant="popout" multiple v-model="panels">
          <v-expansion-panel value="battleTraits">
            <v-expansion-panel-title>Battle Traits</v-expansion-panel-title>
            <v-expansion-panel-text>
              <div v-for="bt of allegianceInfo.info.battleTrait" :key="bt.name" class="mb-5">
                <h4 class="mb-2">{{ bt.name }}</h4> 
                <p>{{ bt.battleTraitDetails }}</p>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel v-for="(table, i) of allegianceInfo.info.otherInfo" :key="i">
            <v-expansion-panel-title>{{ getTitle(table) }}</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-table></v-table>
              <tbody v-html="renderTable(table)"></tbody>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'AllegianceTable',

  data() {
    return {
      panels: ['battleTraits']
    }
  },

  props: {
    allegianceInfo: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getTitle(table) {
      return table.rows[0].children[0].innerText || '';
    },

    renderTable(table) {
      console.log(table.children[0].innerHTML);
      return table.children[0].innerHTML;
    },
  },
}
</script>