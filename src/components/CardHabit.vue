<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

// Props pour passer des variantes
const props = defineProps({
  variants: {
    type: Array as () => { icon: string; title: string }[],
    default: () => [
      { icon: '😀', title: 'Musculation' },
      { icon: '🎉', title: 'Fête' },
      { icon: '📚', title: 'Lecture' },
    ],
  },
});

// Émissions
const emit = defineEmits(['add']);

// Méthode pour gérer les clics sur le bouton +
const onAddClick = (variant: { icon: string; title: string }) => {
  emit('add', variant); // Emit la variante actuelle
};
</script>

<template>
  <div v-for="(variant, index) in variants" :key="index" class="card-habit">
    <!-- Icône dynamique -->
    <div class="card-habit__icon" contenteditable="true">{{ props.variants[index].icon || variant.icon }}</div>
    <!-- Titre dynamique -->
    <div class="card-habit__title" contenteditable="true">{{ variant.title }}</div>
    <!-- Bouton + -->
    <button class="card-habit__button" @click="onAddClick(variant)">+</button>
  </div>
</template>

<style lang="scss">
/* Conteneur principal de la carte */
.card-habit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #FFED23;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  width: 90%;
  max-width: 400px;
  margin: 10px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Icône (Emoji) */
.card-habit__icon {
  font-size: 1.8rem; /* Taille de l'emoji */
  margin-right: 10px;
  flex-shrink: 0;
  cursor: text; /* Permet d'éditer si besoin */
  outline: none; /* Supprime les bordures focus */
}

/* Titre */
.card-habit__title {
  flex-grow: 1;
  font-size: 1.2rem;
  color: #1D1D1F;
  font-weight: 500;
  margin-left:10px;
  text-align: left;
  font-family: $fontTextFamily;
  cursor: text; /* Permet d'éditer si besoin */
  overflow: hidden; /* En cas de dépassement */
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none; /* Supprime les bordures focus */
}

/* Bouton + */
.card-habit__button {
  font-size: 1rem; /* Taille réduite */
  color: white;
  background-color: #1D1D1F; /* Jaune */
  border: none;
  border-radius: 50%;
  width: 28px; /* Plus petit */
  height: 28px; /* Plus petit */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-habit__button:hover {
  background-color: #e5ab00; /* Jaune foncé */
}
</style>
