<script lang="ts" setup>

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

// Props pour le composant
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
    default: 'Connexion',
  },
});

const username = ref('');
const password = ref('');

async function onSubmit(event: Event) {
  event.preventDefault(); // Empêche le rechargement de la page
  
  const response = await fetch('http://localhost:4000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })

 if (!response.ok) throw new Error('Une erreur est survenue lors de la connexion')

 const data = await response.json();

  console.log(data);
  const cookieJwt = useCookie('api_tracking_jwt');
  cookieJwt.value = data.token
  
}


</script>

<template>
  <form @submit="onSubmit" class="login">
    <!-- Utilisation de l'alias /_nuxt pour les assets statiques dans Nuxt -->
    <img src="/images/LogoTracker.svg" alt="Logo" class="login__logo">
    <h2 v-if="showTitle" class="login__title">{{ title }}</h2>
    <div class="login__field">
      <input
        v-model="username" type="username" id="username"
        class="login__input login__input--text"
        :placeholder="usernamePlaceholder"
        aria-label="Nom d’utilisateur"
      >
    </div>
    <div class="login__field">
      <input
        v-model="password"
        type="password" id="password"
        class="login__input login__input--password"
        :placeholder="passwordPlaceholder"
        aria-label="Mot de passe"
      >
    </div>
    <div class="login__actions">
      <Button
        type="submit"
        class="button -connexion"
        :label="buttonLabel"
      />
      <!-- Texte adaptatif sous le bouton -->
      <p class="login__alternate-action">
        {{ alternateActionText }}
      </p>
    </div>
  </form>
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
    font-size: $fontTitleSize;
    margin-bottom: 60px;
    color: $primaryColor;
    font-family: $fontTitleFamily;
  }

  &__field {
    margin-bottom: 15px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: $fontTextSize;
    font-family: $fontTextFamily;

    &--text {
      font-size: $fontTextSize;
    }

    &--password {
      font-size: $fontTextSize;
    }

    &:focus {
      border-color: $gray800;
      outline: none;
    }
  }

  &__alternate-action {
    margin-top: 30px;
    font-size: $fontTextSize;
    color: $gray800;
    font-family: $fontTextFamily;
    cursor: pointer;
    font-weight: 700;
    text-decoration: underline;

    &:hover {
      color: $primaryColor;
    }
  }
}
</style>
 