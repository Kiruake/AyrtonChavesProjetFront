<script setup lang="ts">
const habitTitle = ref('');
const habitDescription = ref('');
const habitIsGlobal = ref(false);
const feedbackMessage = ref('');


const emit = defineEmits(['habit:created']);
async function addHabit() {
  try {
    
    const response = await fetch('http://localhost:4000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('api_tracking_jwt').value}`
      },
      body: JSON.stringify({
        title: habitTitle.value,
        description: habitDescription.value,
        is_global: habitIsGlobal.value

      })
    });

    if (!response.ok) {
      const error = await response.json();
      feedbackMessage.value = `Erreur : ${error.message}`;
      console.error('Erreur:', error);
      return;
    }
    
    const data = await response.json();
    feedbackMessage.value = `Habitude ajoutée : ${data.title}`;
    console.log('Succès:', data);
    
    // Réinitialiser les champs du formulaire
    habitTitle.value = '';
    habitDescription.value = '';

    emit('habit:created');

} catch (error) {
    feedbackMessage.value = 'Erreur réseau ou interne';
    console.error('Erreur réseau ou interne:', error);
}
}


</script>

<template>
  <div class="c-add-habit-form">
    <h2 class="c-add-habit-form__title">Ajouter une Habitude</h2>
    <form class="c-add-habit-form__form" @submit.prevent="addHabit">
      <div class="c-add-habit-form__form-group">
        <label class="c-add-habit-form__form-group__label" for="title">Titre</label>
        <input id="title" v-model="habitTitle" class="c-add-habit-form__form-group__input--text" type="text" placeholder="Entrez le titre de la Habitude">
      </div>
      <div class="c-add-habit-form__form-group">
        <label class="c-add-habit-form__form-group__label" for="description">Description</label>
        <input id="description" v-model="habitDescription" class="c-add-habit-form__form-group__input--text" type="text" placeholder="Entrez la description de la Habitude">
      </div>
      <div class="c-add-habit-form__form-group">
        <label class="c-add-habit-form__form-group__label" for="is_global">Habitude Globale</label>
        <input id="is_global" v-model="habitIsGlobal" class="c-add-habit-form__form-group__input--checkbox" type="checkbox">
      </div>
      <ButtonCardHabit variant="$secondaryColor" label="Ajouter" type="submit" />
    </form>
  </div>
</template>


<style lang="scss">

.c-add-habit-form {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  width: 400px;

  &__title {
    color: #333333;
    font-size: 1.25rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      &__label {
        font-size: 0.875rem;
        color: #555555;
        font-weight: 500;
      }

      &__input {
        &--text {
          padding: 0.75rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;

          &:focus {
            border-color: #007bff;
            box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
            outline: none;
          }
        }

        &--checkbox {
          width: 16px;
          height: 16px;
          accent-color: #007bff;
        }
      }
    }

    &__button {
      padding: 0.75rem 1rem;
      background-color: #007bff;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      text-align: center;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
  }

}

</style>