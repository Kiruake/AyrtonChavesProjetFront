<script lang="ts" setup>

import Button from './Button.vue'

defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  usernamePlaceholder: {
    type: String,
    default: 'Nom d’utilisateur',
  },
  passwordPlaceholder: {
    type: String,
    default: 'Mot de passe',
  },
});
</script>

<template>
  <section class="login">
    <img src="/public/images/LogoTracker.svg" alt="Logo" class="login__logo">
    <h2 v-if="showTitle" class="login__title">Connexion</h2>
    <div class="login__field">
      <input 
        type="text" 
        class="login__input login__input--text" 
        :placeholder="usernamePlaceholder" 
        aria-label="Nom d’utilisateur" 
      />
    </div>
    <div class="login__field">
      <input 
        type="password" 
        class="login__input login__input--password" 
        :placeholder="passwordPlaceholder" 
        aria-label="Mot de passe" 
      />
    </div>
    <div class="login__actions">
      <Button class="button -connexion">Se connecter</Button>
    </div>
  </section>
</template>


<style lang="scss">

.login {

    width: 300px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &__logo {
    text-align: center;
    width: 90%;
  }

  &__title {
    font-size: 2.3rem;
    margin-bottom: 60px;
    color: #FFED23;
    font-family: $fontTextFamily;
  }

 
  &__field {
    margin-bottom: 15px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;

    &--text {
      font-size: 1rem;
    }

    &--password {
      font-size: 1rem;
    }

    &:focus {
      border-color: $gray800;
      outline: none;
    }
  }

}
</style>
