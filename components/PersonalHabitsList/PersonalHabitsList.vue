<script setup lang="ts">
import type { PersonalHabit } from '~/@types/dashboard';


defineProps<{ habits: PersonalHabit[] }>();

const emit = defineEmits([
  'edit',
  'habit:created',
  'habit:updated',
  'habit:deleted',
  'tracking:updated',
  'tracking:history'
]);


function handleHabitDeleted(habitId: PersonalHabit['id']) {
  emit('habit:deleted', habitId);
}

function handleTrackingUpdated(habitId: PersonalHabit['id']) {
  emit('tracking:updated', habitId);
}

function handleHabitUpdated() {
  emit('habit:updated');
}

function handleHabitHistory() {
  emit('tracking:history');
}
</script>

<template>
  <div class="personal-habits">
    <!-- Partie gauche: Liste des habitudes -->
    <div class="personal-habits__left">
      <h2 class="personal-habits__title">DASHBOARD</h2>
      
      <!-- Message quand il n'y a pas d'habitudes -->
      <div v-if="!habits.length" class="personal-habits__message">
        <p>Vous n'avez pas encore d'habitudes enregistrées</p>
      </div>
      
      <!-- Liste des habitudes -->
      <ul class="personal-habits__list">
        <li v-for="habit in habits" :key="habit.id" class="personal-habits__item">
          <div class="personal-habits__card">
            <div class="personal-habits__card-flex">
            <div class="personal-habits__card-header">
              <h3>{{ habit.title }}</h3>
              <p>{{ habit.description }}</p>
            </div>
            <div class="personal-habits__actions">
              <HabitTracking 
                :habit-id="habit.id" 
                @tracking:updated="handleTrackingUpdated" 
              />
              <DeleteHabit 
                :id="habit.id" 
                @habit:delete="handleHabitDeleted" 
              />
            </div>
            </div>
            <div class="personal-habits__tracking">
              <HabitHistory 
                :habit-id="habit.id" 
                :habit-title="habit.title" 
                @tracking:history="handleHabitHistory" 
              />
            </div>
          </div>
          <EditHabitForm 
            v-bind="habit" 
            @habit:updated="handleHabitUpdated" 
          />
        </li>
      </ul>
    </div>

    <!-- Partie droite: Formulaire d'ajout d'une habitude -->
    <div class="personal-habits__right">
      <AddHabitForm @habit:created="handleHabitUpdated" />
    </div>
  </div>
</template>




<style lang="scss">

.personal-habits {
  display: grid;
  grid-template-columns: 1fr; // Par défaut, une seule colonne pour les petits écrans
  grid-template-rows: auto 1fr; // Les lignes sont auto-adaptatives
  height: 100vh;

  // Partie gauche: liste des habitudes
  &__left {
    padding: 1rem;
    overflow-y: auto;
    max-height: 100vh;
    grid-row: 1 / 2; // La partie gauche prend la première ligne
  }

  // Partie droite: Formulaire d'ajout d'habitude
  &__right {
    padding: 1rem;
    border-left: 1px solid #e5e5e5;
    margin-top: 1rem;
    grid-row: 2 / 3; // Partie droite prend la deuxième ligne sur petits écrans
  }

  &__title {
    font-family: $fontTitleFamily;
    color: $secondaryColor;
    font-size: 3rem;
    margin: 0 0 1rem;
  }

  &__message {
    text-align: center;
    font-size: 1.5rem;
    margin-top: 15rem;
    font-family: $fontTitleFamily;
  }

  &__actions {
    display: grid;
 
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: 1rem;
  }

  &__card {
    background: $white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  &__card-flex {
    display: flex;
    justify-content: space-between;
  }

  &__card-header {
    margin-bottom: 1rem;
  }

  // Pour les écrans inférieurs à 960px
  @include medium-down {
    .personal-habits {
      grid-template-columns: 1fr;  // Une seule colonne pour les petits écrans
      grid-template-rows: auto 1fr; // Deux lignes
    }

    &__right {
      grid-row: 2 / 3;  // La partie droite en bas sur petits écrans
      margin-top: 1rem;
    }
  }

  // Pour les écrans à partir de 960px
  @include large-up {
    .personal-habits {
      grid-template-columns: 1fr 1fr;  // Deux colonnes pour les grands écrans
      grid-template-rows: 1fr; // Une seule ligne pour les grands écrans
    }

    &__right {
      grid-row: 1 / 2; // Partie droite reste en haut
      margin-top: 0;
      padding-top: 40%;
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  // Utilisation des mixins pour la largeur des formulaires
  @include medium-down {
    .c-add-habit-form {
      width: 80%;
    }
  }

  @include small-down {
    .c-add-habit-form {
      width: 80%;
    }
  }
}


</style>