<template>
<!--  Обертка папапов-->
  <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
  >
    {{ text }}
<!--    Закрыть Попап-->
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

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
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
})
</script>