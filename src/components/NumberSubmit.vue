<template>
  <view>
    <input v-model="number" type="number" class="input" />
    <button @tap="addNumber">
      Add new number
    </button>
  </view>
</template>

<script>
export default {
  name: 'NumberSubmit',
  data() {
    return {
      number: 0
    }
  },
  methods: {
    addNumber() {
      this.$store.dispatch('addNumber', Number(this.number))
    }
  }
}
</script>

<style>
.input {
  border: 1px solid lightgray;
  margin: 10px;
}
</style>
