<script setup lang="ts">

const {data, refresh } = await useAsyncData('dashboard', async () => { 


const response = await fetch(`http://localhost:4000/dashboard`, {
    method: 'GET',
    // on envoie la valeur du token dans le cookie de à la requête pour s'authentifier auprès de l'API express
    headers: {
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
    }
});


console.log('response : ', response);

return  await response.json();
});

const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGlobal = ref(false);
</script>

<template>
  <div class="c-global-habits-list">
    <h2>Habitudes globales</h2>
    <ul>
      <li v-for="habit in habits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
/* Ajouter vos styles ici */
</style>
