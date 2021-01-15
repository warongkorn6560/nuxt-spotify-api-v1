<template>
  <div>
    <h1>{{ apiRes.name }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const apiRes = await $axios.$get('/api')
    return {
      apiRes,
    }
  },
}
</script>

<style>
</style>