<template>
  <default-layout>
    <template #title>
      {{ unit.name }}
    </template>
    <v-container>
      <v-row>
        <v-col>
          <div class="profile">
            <span class="profile__move">
              {{ unit.unit.move }}
            </span>
            <span class="profile__wounds">
              {{ unit.unit.wounds }}
            </span>
            <span class="profile__save">
              {{ unit.unit.save }}
            </span>
            <span class="profile__bravery">
              {{ unit.unit.bravery }}
            </span>
          </div>
        </v-col>
      </v-row>
      <v-row>
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
    </v-container>
  </default-layout>
</template>

<script setup>
import { useUnit } from "@/functions/army";

const unit = useUnit();
</script>

<script>
import DefaultLayout from "../layouts/Default.vue";

export default {
  name: 'ViewUnit',

  components: { DefaultLayout },

  data() {
    return {
      panels: ['weapons'],
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  background-image: url(../../assets/aos_profile_small.png);
  height: 148px;
  width: 148px;
  position: relative;

  span {
    color: black;
    position: absolute;
  }

  &__move {
    left: 70px;
    top: 35px
  }

  &__wounds {
    left: 32px;
    top: 62px
  }

  &__save {
    left: 95px;
    top: 62px
  }

  &__bravery {
    left: 62px;
    top: 90px
  }
}
</style>
