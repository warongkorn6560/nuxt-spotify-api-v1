<template>
  <div class="text-center mt-32">
    <img class="rounded-full mx-auto" :src="res.image" />
    <h1 class="text-6xl">{{ res.name }}</h1>
    <div class="text-4xl">{{ res.email }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, app }) {
    const res = await $axios.$get('/spotify/userinfo', {
      headers: {
        access_token: app.$cookies.get('spotify_token'),
      },
    })
    console.log(res)
    return {
      res,
    }
  },
}
</script>

