<template>
  <v-navigation-drawer v-model="drawer">
    <v-list-item
      prepend-avatar="mi-amor.jpg"
      title="Jess Lee"
    />

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        prepend-icon="mdi-account-group"
        title="Units"
        value="home"
        @click="activePage = 'units'"
        :active="activePage === 'units'"
      />
      <v-list-item
        prepend-icon="mdi-clipboard-list"
        title="Allegiance"
        value="allegiance"
        @click="activePage = 'allegiance'"
        :active="activePage === 'allegiance'"
      />
      <v-list-item
        prepend-icon="mdi-clipboard-list"
        title="Phases"
        value="about"
        @click="activePage = 'phases'"
        :active="activePage === 'phases'"
      />
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <v-container>
      <div v-if="activePage === 'units'">
        <units :roster="roster">
          <v-btn variant="plain" @click="drawer = !drawer">
            <v-icon size="x-large">mdi-menu</v-icon>
          </v-btn>
        </units>
      </div>
      <div v-if="activePage === 'allegiance'">
        <allegiance :allegiance-info="allegiance">
          <v-btn variant="plain" @click="drawer = !drawer">
            <v-icon size="x-large">mdi-menu</v-icon>
          </v-btn>
        </allegiance>
      </div>
      <div v-if="activePage === 'phases'">
        <phases :abilities="{}">
          <v-btn variant="plain" @click="drawer = !drawer">
            <v-icon size="x-large">mdi-menu</v-icon>
          </v-btn>
        </phases>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import Units from "./Units.vue";
import Phases from './Phases.vue';
import Allegiance from './Allegiance.vue';

export default {
  name: 'ViewRoster',

  components: {
    Units,
    Phases,
    Allegiance,
  },

  props: {
    roster: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      drawer: false,
      activePage: 'units',
    };
  },

  computed: {
    allegiance() {
      return this.roster.find(cat => cat.name === 'Allegiance');
    }
  }
};
</script>

