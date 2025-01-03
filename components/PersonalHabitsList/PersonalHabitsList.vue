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
  <div class="personal-habits-container">
    <div class="content-left">
      <h2 class="content-left__title">DASHBOARD</h2>
      <div v-if="!habits.length" class="content-left__message">
        <p>Vous n'avez pas encore d'habitudes enregistrées</p>
      </div>
      <ul class="habit-list">
        <li v-for="habit in habits" :key="habit.id" class="habit-item">
          <div class="habit-card">
            <div class="habit-header-flex">
              <div class="habit-header">
                <h3>{{ habit.title }}</h3>
                <p>{{ habit.description }}</p>
              </div>
              <div class="habit-actions">
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
            <div class="habit-tracking">
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
    <div class="content-right">
      <AddHabitForm @habit:created="handleHabitUpdated" />
    </div>
  </div>
</template>


<style lang="scss">

.personal-habits-container {
  display: flex;
  flex-direction: column; // Par défaut pour mobile
  height: 100vh;
  overflow: hidden;

  .content-left {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;

    &__title {
      font-family: $fontTitleFamily;
      color: orange;
      margin-top:0;
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    &__message {
      text-align: center;
      margin-top: 15rem;
      font-size: 1.5rem;
      font-family: $fontTitleFamily;
    }

    .habit-list {
      list-style: none;
      padding: 0;
      margin: 0;

      .habit-item {
        margin-bottom: 1rem;

        .habit-card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;

          &:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          }

          .habit-header-flex {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .habit-header {
              .title {
                font-size: 1.25rem;
                margin: 0 0 0.5rem;
              }

              .description {
                font-size: 0.875rem;
                color: #555;
                margin: 0;
              }
            }

            .habit-actions {
              display: flex;
              gap: 0.5rem;
              align-items: center;
            }
          }

          .habit-tracking {
            margin-top: 0.5rem;
            gap: 0.5rem;
          }
        }
      }
    }
  }

  .content-right {
    flex: 0 0 auto;
    padding: 1rem;
    border-top: 1px solid #e5e5e5;

    .add-habit-form {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;

      .title {
        font-size: 1.25rem;
        text-align: center;
        margin-bottom: 1rem;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .form-group {
          .label {
            font-size: 0.875rem;
            color: #555;
          }

          .text-input {
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.3s, box-shadow 0.3s;

            &:focus {
              border-color: #007bff;
              box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
              outline: none;
            }
          }

          .checkbox-input {
            width: 16px;
            height: 16px;
            accent-color: #007bff;
          }
        }

        .submit-button {
          padding: 0.75rem 1rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          text-align: center;
          transition: background-color 0.3s;

          &:hover {
            background-color: #0056b3;
          }

          &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }

  // Styles pour tablettes
  @include medium-only() {
    .content-left {
      flex: 2;
      padding: 2rem;

      .title {
        font-size: 2rem;
        margin-bottom: 2rem;
      }

      .habit-list .habit-item .habit-card {
        padding: 1.5rem;
      }
    }

    .content-right {
      flex: 0 0 30%;
      padding: 2rem;
    }
  }

  // Styles pour ordinateurs
  @include large-up() {
 

    flex-direction: row;

.content-left {
  flex: 1;
  padding: 1.5rem;

  .title {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
}

.content-right {
  flex: 0 0 40%;
  border-top: none;
  border-left: 1px solid #e5e5e5;
  height: 100vh;
  padding: 2rem;
  padding-top: 10rem;
}
  }
}

</style>
