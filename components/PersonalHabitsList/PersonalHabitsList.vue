<script setup lang="ts">
import type { PersonalHabit } from '~/@types/dashboard';
defineProps<{ habits: PersonalHabit[] }>();

const emit = defineEmits([
  'edit',           
  'habit:created',  
  'habit:updated',  
  'habit:deleted',  
  'tracking:updated' // Pour signaler le suivi d'une habitude
]);

function handleEdit(habit: PersonalHabit) {
  emit('edit', habit);
}

function handleHabitDeleted(habitId: PersonalHabit['id']) {
  emit('habit:deleted', habitId);
}

function handleTrackingUpdated(habitId: PersonalHabit['id']) {
  emit('tracking:updated', habitId);
}

function handleHabitUpdated () {
  emit('habit:updated');
}
</script>

<template>
  <div class="personal-habits-list">
    <h2>Habitudes personnelles</h2>
    <ul>
      <li v-for="habit in habits" :key="habit.id" class="habit-item">
        <h3>{{habit.title }}</h3>
        <p>{{ habit.description }}</p>
       
        <button @click="handleEdit(habit)">Modifier</button>

        <EditHabitForm v-bind="habit" @habit:updated="handleHabitUpdated" />

        <DeleteHabit
          :id="habit.id"
          @habit:delete="handleHabitDeleted"
        />
       
        <HabitTracking
          :habit-id="habit.id"
          @tracking:updated="handleTrackingUpdated"
        />
      
        <HabitHistory
          :habit-id="habit.id"
          :habit-title="habit.title"
        />
      </li>
    </ul>
    <AddHabitForm />
  </div>
</template>




<style lang="scss">

</style>