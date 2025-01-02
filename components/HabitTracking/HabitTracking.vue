<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  habitId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['tracking:updated']);

const trackingMessage = ref('');

// Enregistrer un nouveau suivi
async function trackHabit() {
  try {
    const response = await fetch(`http://localhost:4000/tracking/${props.habitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
      body: JSON.stringify({
        completed: true,
        date: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      trackingMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }

    const result = await response.json();
    trackingMessage.value = `Suivi enregistré pour le ${result.date}`;
    emit('tracking:updated', result);
  } catch (error) {
    trackingMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}
</script>

<template>
  <div class="c-habit-tracking">
    <button class="c-habit-tracking__button" @click="trackHabit">Enregistrer</button>
  </div>
</template>

<style scoped lang="scss">


   

      button {
        background-color: green;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #0056b3;
        }
}

</style>
