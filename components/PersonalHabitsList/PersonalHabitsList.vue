<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  habits: {
    type: Array,
    required: true,
  },
});



const emit = defineEmits(['habit:edit', 'habit:delete']);
</script>

<template>
  <div class="c-personal-habits-list">
    <h2>Habitudes personnelles</h2>
    <ul>
      <li v-for="habit in habits" :key="habit.id">
        <h3>{{ habit.title }}</h3>
        <p>{{ habit.description }}</p>
        <button @click="$emit('habit:edit', habit)">Modifier</button>
        <button @click="$emit('habit:delete', habit)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
/* Ajouter vos styles ici */
</style>
