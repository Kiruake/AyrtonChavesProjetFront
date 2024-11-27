<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  variant: {
    type: Object as () => { icon: string; title: string },
    required: true,
  },
});
</script>

<template>
  <div class="card-AddHabit">
    <div class="card-AddHabit__icon">
      {{ variant.icon }}
    </div>
    <div class="card-AddHabit__title">
      {{ variant.title }}
    </div>
    <button class="card-AddHabit__button">+</button>
  </div>
</template>

<style lang="scss">
.card-AddHabit {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $secondaryColor;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &__icon {
    font-size: $fontTextSize;
    margin-right: 10px;
    flex-shrink: 0;
  }

  &__title {
    flex-grow: 1;
    font-size: $fontTextSize;
    color: $black;
    font-weight: 500;
    margin-left: 10px;
    text-align: left;
    font-family: $fontTextFamily;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__button {
    font-size: $fontTextSize;
    color: $secondaryColor;
    background-color: $primaryColor;
    border: none;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
}
</style>
