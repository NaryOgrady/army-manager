<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="font-weight-bold mb-3">
          Welcom to army manager
        </h1>

        <p class="subheading font-weight-regular">
          To continiue please upload your html roster file.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
      <input type="file" @change="readRosterFile">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'RosterUploader',

  methods: {
    readRosterFile(event) {
      const file = event.target.files[0];
      if (!file) {
        throw new Error('Incorrect file');
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const parser = new DOMParser();
        const rosterDom = parser.parseFromString(e.target.result, 'text/html');
        this.$emit('upload', rosterDom);
      }
      reader.readAsText(file);
    },
  },
};
</script>
