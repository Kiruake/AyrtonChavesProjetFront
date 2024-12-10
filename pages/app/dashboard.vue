<script setup>

const globalHabits = ref([]);

async function fetchData() {
  try {
    const response = await fetch('http://localhost:4000/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    });

    if (!response.ok) {
      console.error('Erreur lors de la récupération des données:', await response.json());
      return;
    }

    const data = await response.json();
    globalHabits.value = data.globalHabits || []; 
    
  } catch (error) {
    console.error(error);
  }
}

onMounted(fetchData);
</script>


<template>
<main>
<h1>Dashboard</h1>

<template>
  <div>
    <h2>Habitudes globales</h2>
    <ul>
      <li v-for="habit in globalHabits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
      </li>
    </ul>
  </div>
</template>



</main>

</template>

<style lang="scss">

</style>