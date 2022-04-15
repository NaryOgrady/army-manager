<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header of headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of rows" :key="row.name">
        <td v-for="value of Object.keys(row)" :key="value">
          {{ row[value] }}
        </td> 
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'DamageTable',

  props: {
    damageTable: {
      type: Object,
      required: true,
    },
  },

  computed: {
    headers() {
      const headerObject = this.damageTable[0];
      return Object.keys(headerObject).map(key => headerObject[key]);
    },
    
    rows() {
      return this.damageTable.slice(1);
    },
  }
};
</script>
