<template>
  <div
    v-for="weapon of weapons"
    :key="weapon.name"
    class="mb-5"
  >
    <h4>{{ `${weapon.name} - ${weapon.type.toLowerCase()}` }}</h4>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="header of headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody @touchend.stop="null">
        <tr>
          <td
            v-for="header of headers"
            :key="header"
          >
            {{ weapon[header] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'WeaponsTable',

  props: {
    weaponData: {
      type: Object,
      required: true,
    },
  },


  computed: {
    weapons() {
      if (Array.isArray(this.weaponData)) {
        return this.weaponData;
      }
      return [this.weaponData];
    },

    headers() {
      return Object.keys(this.weapons[0]).filter(key => key !== 'name' && key !== 'type');
    },
  },
};
</script>