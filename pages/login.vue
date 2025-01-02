<script setup lang="ts">

</script>

<template>
  <main>

  <div class="homepage"/>

<Form v-bind="{action: 'login'}"  :title="'Connexion'"/>


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
