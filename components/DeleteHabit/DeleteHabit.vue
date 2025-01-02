<script setup lang="ts">
import type { PersonalHabit } from '~/@types/dashboard';

// Définir les props avec le type attendu
const props = defineProps<{ id: PersonalHabit['id'] }>();

// Définir les événements émis
const emit = defineEmits(['habit:delete']);

// Gestionnaire de message de retour
const feedbackMessage = ref('');

// Fonction pour supprimer une habitude
async function deleteHabit() {
  try {
    // Appeler l'API pour supprimer l'habitude
    const response = await fetch(`http://localhost:4000/habits/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      }
    });

    // Gérer les erreurs HTTP
    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }

    // Réponse API
    const deletedHabit = await response.json();
    feedbackMessage.value = `Habitude supprimée`;

    // Émettre l'événement avec l'habitude supprimée
    emit('habit:delete', deletedHabit);

  } catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}

</script>

<template>
  <div>
    <button class="delete-button" @click="deleteHabit">Supprimer</button>

    <p v-if="feedbackMessage">{{ feedbackMessage }}</p>
  </div>
</template>

<style>

.delete-button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

</style>
