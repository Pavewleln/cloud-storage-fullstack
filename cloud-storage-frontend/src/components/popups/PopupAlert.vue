<template>
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
  }),
}
</script>