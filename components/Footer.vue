<script setup lang="ts">

</script>

<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__logo-container">
        <NuxtLink to="/" class="footer__logo-link">
          <img class="footer__logo" src="/images/LogoTracker.svg" alt="Logo">
        </NuxtLink>
      </div>

      <nav class="footer__nav">
        <ul class="footer__list">
          <li class="footer__item">
            <NuxtLink to="/app/dashboard" class="footer__link">Dashboard</NuxtLink>
          </li>
          <li class="footer__item">
            <NuxtLink to="/app/communaute" class="footer__link">Communauté</NuxtLink>
          </li>
          <li class="footer__item">
            <NuxtLink to="/blog/" class="footer__link">Blog</NuxtLink>
          </li>
          <li class="footer__item">
            <NuxtLink to="/login" class="footer__link">Connexion</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Footer info section -->
    <div class="footer__info">
      <p class="footer__copyright">&copy; 2025, Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: $primaryColor;
  color: $secondaryColor;
  padding: 2rem;
  z-index: 1000;
  position: relative;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__logo-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__logo {
    max-width: 180px; /* Logo agrandi pour les grands écrans */
  }

  &__nav {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;

    @include medium-down {
      justify-content: flex-start;
      margin-top: 1rem;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;

    @include large-up {
      width: 60%; /* 2 colonnes pour grands écrans */
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  &__item {
    margin: 0;
  }

  &__link {
    text-decoration: none;
    color: #F1F7F7;
    font-size: 1rem;
    font-weight: 700;
    transition: color 0.3s ease;
    font-family: 'Nunito', sans-serif;

    &:hover {
      color: orange;
    }
  }

  &__info {
    text-align: center;
    color: #F1F7F7;
    margin-top: 3rem;
    border-top: 1px solid white;

    &__copyright {
      margin: 0.5rem 0;
      margin-top: 3rem;
    }
  }

  @include medium-down {
    &__logo-container {
      flex: 1 1 100%;
      justify-content: center;
      margin-bottom: 1rem;
    }

    &__nav {
      flex: 1 1 100%;
      justify-content: center;
    }

    &__info {
      margin-top: 3rem;
    }
  }
}
</style>
