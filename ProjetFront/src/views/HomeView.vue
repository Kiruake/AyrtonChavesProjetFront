<script setup lang="ts">

import MyForm from '../components/Form.vue'


</script>

<template>
  <main>
  <video class="video" autoplay loop muted>
    <source  src="/public/videos/video_login.mp4" type="video/mp4">
  </video>

<MyForm/>


  </main>
</template>

<style lang="css">

.video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  display: block;
  position: fixed; /* Remplacé relative par fixed pour un fond en plein écran */
  top: 0;
  left: 0;
  z-index: -1; /* Place la vidéo en arrière-plan */
}


</style>
