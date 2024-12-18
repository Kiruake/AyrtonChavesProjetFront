<script setup lang="ts">

const props = defineProps({
  habitId: {
    type: Number,
    required: true,
  },
  habitTitle: {
    type: String,
    required: true,
  },
});

interface MyType {
  id: number;
  date: string;
}

const emit = defineEmits(['tracking:history']);

const trackingHistory = ref<MyType[]>([]);
const errorMessage = ref('');
const isHistoryVisible = ref(false); // État local pour afficher/masquer l'historique

// Charger l'historique depuis l'API
async function fetchTrackingHistory() {
  try {
    const response = await fetch(`http://localhost:4000/tracking/${props.habitId}/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      errorMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur lors du chargement de l\'historique :', error);
      return;
    }

    const result = await response.json();
    trackingHistory.value = result.trackings;
    emit('tracking:history', );
  } catch (error) {
    errorMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}

// Basculer l'affichage de l'historique
function toggleHistoryVisibility() {
  if (!isHistoryVisible.value) {
    fetchTrackingHistory(); // Charger l'historique seulement quand il est ouvert
  }
  isHistoryVisible.value = !isHistoryVisible.value;
}
</script>

<template>
  <div class="history">
    <button @click="toggleHistoryVisibility">
      {{ isHistoryVisible ? 'Masquer l\'historique' : 'Voir l\'historique' }}
    </button>
    <div v-if="isHistoryVisible">
      <h3>Historique pour : {{ habitTitle }}</h3>
      <ul v-if="trackingHistory.length">
        <li v-for="record in trackingHistory" :key="record.date">
          Date : {{ new Date(record.date).toLocaleDateString() }}
        </li>
      </ul>
      <p v-else>Aucun suivi enregistré pour cette habitude.</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style  lang="scss">
.history {
  margin-top: 10px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  button {
    background-color: #007bff;
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

  h3 {
    margin-top: 10px;
    color: #343a40;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      background: #fff;
      margin-bottom: 5px;
      padding: 5px 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
    }
  }

  .error {
    color: red;
    margin-top: 10px;
  }
}
</style>
