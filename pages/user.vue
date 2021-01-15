<template>
  <div class="text-center mt-32">
    <img class="rounded-full mx-auto" :src="res.image" />
    <h1 class="text-6xl">{{ res.name }}</h1>
    <div class="text-4xl">{{ res.email }}</div>
    <div class="flex">
      <a
        target="_blank"
        :href="res.playlist.body.items[0].external_urls.spotify"
        ><img :src="res.playlist.body.items[0].images[0].url"
      /></a>

      <a
        target="_blank"
        :href="res.playlist.body.items[1].external_urls.spotify"
      >
        <img :src="res.playlist.body.items[1].images[0].url"
      /></a>
    </div>

    {{ res }}
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
    return {
      res,
    }
  },
}
</script>

