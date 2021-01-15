<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    document.cookie = `spotify_token=${this.$route.query.access_token}`
    window.location.href = '/user'
  },
}
</script>