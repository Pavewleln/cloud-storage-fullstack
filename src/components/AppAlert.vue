<template>
  <v-alert :type="type">{{text}}</v-alert>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default(value){
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>