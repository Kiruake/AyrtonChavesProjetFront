<script setup lang="ts">
// État pour le menu mobile
const isMenuOpen = ref(false);

// Vérifier si le cookie 'api_tracking_jwt' existe
const cookieJwt = useCookie('api_tracking_jwt');

// Si le cookie JWT existe, l'utilisateur est connecté
const isAuthenticated = computed(() => !!cookieJwt.value);

// Fonction pour basculer le menu mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fonction pour fermer le menu mobile
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>



<template>
  <header class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo-link" @click="closeMenu">
        <img class="header__logo" src="/images/LogoTracker.svg" alt="Logo">
      </NuxtLink>
      <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
        <ul class="header__list">
          <!-- Afficher Dashboard uniquement si l'utilisateur est connecté -->
          <li v-if="isAuthenticated" class="header__item">
            <NuxtLink to="/app/dashboard" class="header__link" @click="closeMenu">Dashboard</NuxtLink>
          </li>
          <!-- Afficher Communauté uniquement si l'utilisateur est connecté -->
          <li v-if="isAuthenticated" class="header__item">
            <NuxtLink to="/app/communaute" class="header__link" @click="closeMenu">Communauté</NuxtLink>
          </li>
          <!-- Autres liens visibles pour tous -->
          <li class="header__item">
            <NuxtLink to="/blog/" class="header__link" @click="closeMenu">Blog</NuxtLink>
          </li>
          <!-- Lien Connexion visible uniquement si l'utilisateur n'est pas connecté -->
          <li v-if="!isAuthenticated" class="header__item">
            <NuxtLink to="/login" class="header__link" @click="closeMenu">Connexion</NuxtLink>
          </li>
        </ul>
      </nav>
      <!-- Bouton hamburger pour le mobile -->
      <button class="header__toggle" aria-label="Toggle Menu" @click="toggleMenu">
        <span :class="{ 'header__toggle-bar--active': isMenuOpen }" class="header__toggle-bar"/>
        <span :class="{ 'header__toggle-bar--active': isMenuOpen }" class="header__toggle-bar"/>
        <span :class="{ 'header__toggle-bar--active': isMenuOpen }" class="header__toggle-bar"/>
      </button>
    </div>
  </header>
</template>



<style lang="scss">

.header {
  background-color: $primaryColor;
  color: $secondaryColor;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;

    @include large-up {
      flex-direction: row;
    }
  }

  &__logo {

    max-width: 150px;

    @include large-up {
     
    }
  }

  &__nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $primaryColor;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transform: translateY(-100%);
    transition: transform 0.3s ease;

    &--open {
      transform: translateY(0);
    }

    @include large-up {
      position: static;
      flex-direction: row;
      transform: none;
      background-color: transparent;
      width: auto;
      height: auto;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 3rem;

    @include large-up {
      flex-direction: row;
      gap: 0;
    }
  }

  &__item {
    margin: 0;

    @include large-up {
      margin: 0 1rem;
    }
  }

  &__link {
    text-decoration: none;
    color: $thirdColor;
    font-size: $fontSubTitleSize;
    font-weight: 700;
    transition: color 0.3s ease;
    font-family: 'Nunito', sans-serif;

    &:hover {
      color: $secondaryColor;
    }

    @include large-up {
      font-size: 1rem;
    }
  }

  &__toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 38px;
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;

    @include large-up {
      display: none;
    }

    &-bar {
      width: 100%;
      height: 3px;
      background-color: $secondaryColor;
      transition: all 0.3s ease;
      border-radius: 2px;

      &--active:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      &--active:nth-child(2) {
        opacity: 0;
      }
      &--active:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}
</style>
