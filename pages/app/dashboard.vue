<script setup lang="ts">

const {data} = await useAsyncData('dashboard', async () => { 
    return await useTrackingApi('/dashboard', {method:'GET'});
});

</script>

<template>
<main>
<h1>Dashboard</h1>

  <div>
    <GlobalHabitsList :habits="data.globalHabits" />
  </div>

  <div>
    <PersonalHabitsList :habits="data.personalHabits" />
  </div>


</main>
</template>



<style lang="scss">

</style>