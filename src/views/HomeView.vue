<script setup lang="ts">

import MyForm from '../components/Form.vue'



</script>

<template>
  <main>

  <div class="homepage">
  <video class="homepage__video" autoplay loop muted>
    <source  src="/videos/video_login.mp4" type="video/mp4">
  </video>
  </div>

<MyForm :title="'Connexion'"/>


  </main>
</template>

<style lang="scss">

.homepage {
  display: block;

&__video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  display: block;
  position: fixed; 
  top: 0;
  left: 0;
  z-index: -1; 
}

}
</style>
