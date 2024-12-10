<script setup lang="ts">
import { ref, watch } from 'vue';

// Définition des props
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  is_global: {
    type: Boolean,
    required: true,
  },
});

// Déclaration des événements
const emit = defineEmits(['habit:updated', 'cancel']);

// Champs du formulaire liés aux props
const habitTitleEdit = ref(props.title);
const habitDescriptionEdit = ref(props.description);
const habitIsGlobalEdit = ref(props.is_global);

// Re-synchroniser les valeurs des champs si les props changent
watch(
  () => props,
  (newProps) => {
    habitTitleEdit.value = newProps.title;
    habitDescriptionEdit.value = newProps.description;
    habitIsGlobalEdit.value = newProps.is_global;
  },
  { deep: true }
);

const feedbackMessage = ref('');

async function editHabit() {
  try {
    const response = await fetch(`http://localhost:4000/habits/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`,
      },
      body: JSON.stringify({
        title: habitTitleEdit.value,
        description: habitDescriptionEdit.value,
        is_global: habitIsGlobalEdit.value,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }

    const updatedHabit = await response.json();
    feedbackMessage.value = `Habitude modifiée : ${updatedHabit.title}`;

    // Émettre un événement pour informer le parent que l'habitude a été mise à jour
    emit('habit:updated', updatedHabit);
  } catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}
</script>

<template>
  <div class="c-edit-habit-form">
    <h2>Modifier une Habitude</h2>
    <form @submit.prevent="editHabit">
      <div>
        <label for="title">Titre</label>
        <input id="title" v-model="habitTitleEdit" type="text" placeholder="Titre de l'habitude" />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="habitDescriptionEdit" placeholder="Description"></textarea>
      </div>
      <div>
        <label for="isGlobal">Rendre publique?</label>
        <input id="isGlobal" v-model="habitIsGlobalEdit" type="checkbox" />
      </div>
      <div>
        <p v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</p>
      </div>
      <button type="submit">Modifier</button>
      <button type="button" @click="$emit('cancel')">Annuler</button>
    </form>
  </div>
</template>

<style lang="scss">
/* Ajouter vos styles ici */
.feedback-message {
  color: red;
  font-size: 0.9em;
}
</style>
