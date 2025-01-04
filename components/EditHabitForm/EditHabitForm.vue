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
  <div class="edit-habit">
    <!-- Bouton pour afficher/masquer le formulaire -->
    <img 
      :src="isEditVisible ? '/icons/RedCrossIcon.png' : '/icons/editIcon.png'" 
      :alt="isEditVisible ? 'Masquer le formulaire' : 'Modifier'"
      :class="['edit-habit__toggle-icon', { 'edit-habit__toggle-icon--active': isEditVisible }]" 
      @click="toggleEditVisibility" 
    >

    <!-- Transition pour animer l'ouverture/fermeture du formulaire -->
    <transition name="fade">
      <div v-if="isEditVisible" class="edit-habit__form-container">
        <h2 class="edit-habit__title">Modifier "{{ props.title }}"</h2>
        <form class="edit-habit__form" @submit.prevent="editHabit">
          <div class="edit-habit__field">
            <label class="edit-habit__label" for="title">Titre</label>
            <input id="title" v-model="habitTitleEdit" class="edit-habit__input" type="text" placeholder="Titre de l'habitude" >
          </div>
          <div class="edit-habit__field">
            <label class="edit-habit__label" for="description">Description</label>
            <textarea id="description" v-model="habitDescriptionEdit" class="edit-habit__textarea" placeholder="Description"/>
          </div>
          <div class="edit-habit__field">
            <label class="edit-habit__label" for="isGlobal">Rendre publique?</label>
            <input id="isGlobal" v-model="habitIsGlobalEdit" class="edit-habit__checkbox" type="checkbox" >
          </div>
          <div>
            <p v-if="feedbackMessage" class="edit-habit__feedback">{{ feedbackMessage }}</p>
          </div>
          <ButtonCardHabit variant="$secondaryColor" label="Valider" type="submit" />
        </form>
      </div>
    </transition>
  </div>
</template>


<style lang="scss">

.edit-habit {
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__toggle-icon {
    cursor: pointer;
    height: 24px;
    width: 24px;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &--active {
      transform: rotate(90deg);
      opacity: 0.8;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__form-container {
    background-color: #ffffff;
    padding: 1.5rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: #333;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__label {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
  }

  &__input,
  &__textarea {
    width: 90%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 80px;
  }

  &__checkbox {
    width: auto;
    margin-right: 0.5rem;
  }

  &__feedback {
    color: red;
    font-size: 0.9rem;
    font-style: italic;
    margin-top: 0.5rem;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}

</style>