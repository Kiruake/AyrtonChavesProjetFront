<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PersonalHabit } from '~/@types/dashboard';

// Définition des props
const props = defineProps<PersonalHabit>();

// Déclaration des événements
const emit = defineEmits(['habit:updated', 'cancel']);

// Champs du formulaire liés aux props
const habitTitleEdit = ref(props.title);
const habitDescriptionEdit = ref(props.description);
const habitIsGlobalEdit = ref(props.is_global);
const isEditVisible = ref(false); // État local pour afficher/masquer le formulaire

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
        is_global: habitIsGlobalEdit.value ? 1 : 0,
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

    // Masquer le formulaire après mise à jour
    isEditVisible.value = false;
  } catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
  }
}

function toggleEditVisibility() {
  isEditVisible.value = !isEditVisible.value;
}
</script>

<template>
  <div class="c-edit-habit-form">
    <!-- Bouton pour afficher/masquer le formulaire -->
    <button @click="toggleEditVisibility" :class="{ active: isEditVisible }">
      {{ isEditVisible ? 'Masquer le formulaire' : 'Modifier' }}
    </button>

    <!-- Transition pour animer l'ouverture/fermeture du formulaire -->
    <transition name="fade">
      <div v-if="isEditVisible" class="form-container">
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
    </transition>
  </div>
</template>

<style lang="scss">
.c-edit-habit-form {
  margin: 1rem 0;

  button {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 4px;

    &.active {
      background-color: #0056b3;
    }
  }

  .form-container {
    background: #f9f9f9;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .feedback-message {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
