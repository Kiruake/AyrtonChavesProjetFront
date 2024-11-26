<script lang="ts" setup>
import { computed } from 'vue';
import MyButton from './Button.vue';
import { useRoute } from 'vue-router';


const route = useRoute(); // Récupère la route actuelle

// Déterminer si la vue active est SignUpView
const isSignUpView = computed(() => route.path === '/signup'); 


// Texte du bouton principal
const buttonLabel = computed(() => (isSignUpView.value ? 'S’inscrire' : 'Se connecter'));

// Texte pour l'action alternative
const alternateActionText = computed(() =>
  isSignUpView.value
    ? "Vous avez déjà un compte ? Se connecter"
    : "Vous n’avez pas de compte ? S’inscrire"
);



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
  title: {
    type: String,
  },
});
</script>

<template>
  <section class="login">
    <img src="/images/LogoTracker.svg" alt="Logo" class="login__logo" />
    <h2 v-if="showTitle" class="login__title">{{ title }}</h2>
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
      <MyButton
        class="button -connexion"
        :label="buttonLabel"
      />
      <!-- Texte adaptatif sous le bouton -->
      <p class="login__alternate-action">
        {{ alternateActionText }}
      </p>
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

  &__actions {
    margin-top: 20px;

    .login__alternate-action {
      margin-top: 30px;
      font-size: 0.9rem;
      color: $gray800;
      font-family: $fontTextFamily;
      cursor: pointer;
      font-weight: 700;
      text-decoration: underline;

      &:hover {
        color: #FFED23;
      }
    }
  }
}


</style>