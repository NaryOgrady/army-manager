<template>
  <v-row>
    <v-col>
      <div class="d-flex">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="category"
        />
        <slot />
      </div>
    </v-col>
  </v-row>
  <v-carousel
    v-model="carouselIndex"
    height="auto"
    :show-arrows="showArrows"
    vertical
    @change="setShowArrowsTrue"
  >
    <v-carousel-item
      v-for="(unit, i) of units"
      :key="i + 'ci'"
    >
      <div class="pb-60">
        <v-row>
          <v-col>
            <h3 v-if="selectedCategory.includes('Malign Sorcery')">
              {{ unit.name }}
            </h3>
            <h3 v-else>
              {{ unit.unit.name }}
            </h3>
          </v-col>
        </v-row>
        <v-row v-if="selectedCategory.includes('Malign Sorcery')">
          <v-col>
            <v-table>
              <thead>
                <th
                  v-for="key of Object.keys(unit.spell)"
                  :key="key + 'header'"
                >
                  {{ key }}
                </th>
              </thead>
              <tbody>
                <td
                  v-for="key of Object.keys(unit.spell)"
                  :key="key + 'data'"
                >
                  {{ unit.spell[key] }}
                </td>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <div class="stats">
              <div class="stats__move">
                {{ unit.unit.move }}
              </div>
              <div class="stats__wounds">
                {{ unit.unit.wounds }}
              </div>
              <div class="stats__save">
                {{ unit.unit.save }}
              </div>
              <div class="stats__bravery">
                {{ unit.unit.bravery }}
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="selectedCategory.includes('Malign Sorcery')">
          <v-col>
            <div
              v-for="ability of unit.unitAbilities"
              :key="ability"
              class="mb-5"
            >
              <h3 class="mb-2">
                {{ ability.name }}
              </h3>
              <p>
                {{ ability.abilityDetails }}
              </p>
            </div>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-expansion-panels
              v-model="panels"
              variant="popout"
              multiple
            >
              <v-expansion-panel
                v-if="unit.weapon"
                value="weapons"
              >
                <v-expansion-panel-title>Weapons</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <weapons :weapon-data="unit.weapon" />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel v-if="getDamageTable(unit)">
                <v-expansion-panel-title>Damage Table</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <damage-table :damage-table="getDamageTable(unit)" />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel
                v-if="isLeader"
                value="leaderInfo"
              >
                <v-expansion-panel-title>Leader Info</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <leader-info :unit="unit" />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel v-if="unit.unitAbilities">
                <v-expansion-panel-title>Abilities</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <abilities :abilities="unit.unitAbilities" />
                </v-expansion-panel-text>
              </v-expansion-panel>
              <v-expansion-panel v-if="unit.magic">
                <v-expansion-panel-title>Magic</v-expansion-panel-title>
                <v-expansion-panel-text>
                  <magic :unit="unit" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import Weapons from './Weapons.vue';
import LeaderInfo from './LeaderInfo.vue';
import Abilities from './Abilities.vue';
import Magic from './Magic.vue';
import DamageTable from './DamageTable.vue';

export default {
  name: 'UnitsView',

  components: {
    Weapons,
    LeaderInfo,
    Abilities,
    Magic,
    DamageTable,
  },

  props: {
    roster: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      selectedCategory: '',
      carouselIndex: 0,
      panels: ['weapons'],
      showArrows: false,
      timeout: null,
    };
  },

  computed: {
    categories() {
      const ignoredCategories = ['Allegiance', 'Game Options', 'Core Battalion'];
      return this.roster.filter(cat => !ignoredCategories.includes(cat.name))
        .map(cat => cat.name);
    },

    selectedCategoryData() {
      return this.roster.find(cat => cat.name === this.selectedCategory);
    },

    units() {
      return this.selectedCategoryData?.units || [];
    },

    isLeader() {
      return this.selectedCategory.includes('Leader');
    },
  },

  watch: {
    carouselIndex() {
      this.setShowArrowsTrue();
    },
  },

  mounted() {
    if (!this.roster.length) {
      throw new Error('Invalid Roster');
    }
    this.selectedCategory = this.roster.find(cat => cat.name.includes('Leader')).name;
    this.setShowArrowsTrue();
  },

  methods: {
    setShowArrowsTrue() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.showArrows = true;
      this.timeout = setTimeout(() => this.showArrows = false, 2500);
    },

    getDamageTable(unit) {
      if (unit.damageTable) {
        return unit.damageTable;
      }
      return unit[`${this.camelize(unit.unit.name)}Wounds`];
    },

    camelize(str) {
      // eslint-disable-next-line no-debugger
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.pb-60 {
  padding-bottom: 60px;
}
.stats {
  width: 200px;
  height: 200px;
  background-image: url("../assets/profile.png");
  position: relative;

  div {
    position: absolute;
  }

  &__move {
    top: 45px;
    left: 92px;
  }

  &__wounds {
    top: 78px;
    left: 42px;
  }

  &__save {
    top: 78px;
    left: 132px;
  }

  &__bravery {
    top: 124px;
    left: 86px;
  }
}
</style>
