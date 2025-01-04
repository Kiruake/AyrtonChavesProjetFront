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
  <div class="tracking-history">
    <ButtonCardHabit variant="$secondaryColor" label="Historique"  @click="toggleHistoryVisibility">
      {{ isHistoryVisible ? 'Masquer l\'historique' : 'Voir l\'historique' }}
    </ButtonCardHabit>
    <div v-if="isHistoryVisible" class="tracking-history__content">
      <ul v-if="trackingHistory.length" class="tracking-history__list">
        <li v-for="record in trackingHistory" :key="record.date" class="tracking-history__item">
          Habitude effectué le {{ new Date(record.date).toLocaleDateString() }}
        </li>
      </ul>
      <p v-else class="tracking-history__message">Aucun suivi enregistré pour cette habitude.</p>
      <p v-if="errorMessage" class="tracking-history__error">{{ errorMessage }}</p>
    </div>
  </div>
</template>


<style lang="scss">

.tracking-history {
  margin-top: 10px;
  padding: 10px 0;
  border-radius: 5px;


  &__content {
    margin-top: 10px;
  }

  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    background: #f8f9fa;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &__message {
    font-size: 1rem;
    color: #6c757d;
  }

  &__error {
    color: red;
    margin-top: 10px;
  }
}

</style>
