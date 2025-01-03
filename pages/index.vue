<script setup lang="ts">

import type { SanityDocument } from "@sanity/client";

const { data: homepage } = await useSanityQuery<SanityDocument>(groq`
  *[_type == "homepage" && defined(hero)][0] {
    title,
    hero {
      title,
      text,
      video {
        asset->{
          url
        }
      },
      stats[] {
        value,
        text
      }
    },
    features {
      title,
      text,
      cards[] {
        name,
        description,
        image {
          asset->{
            url
          }
        }
      }
    }
  }
`);

</script>


<template>
  <main>
    <section class="hero">
      <!-- Conteneur vidéo -->
      <div class="hero__video-container">
        <video 
          v-if="homepage?.hero.video?.asset?.url" 
          :src="homepage.hero.video.asset.url" 
          autoplay 
          loop 
          muted 
          playsinline 
          class="hero__video"/>
      </div>

      <!-- Contenu centré (Titre et Texte) -->
      <div class="hero__content">
        <p class="hero__title">{{ homepage?.hero.title }}</p>
        <p class="hero__description">{{ homepage?.hero.text }}</p>
      </div>

      <!-- Statistiques en bas à gauche -->
      <div class="hero__stats">
        <ul class="stats__list">
          <li 
            v-for="stat in homepage?.hero.stats" 
            :key="stat._key" 
            class="stats__item"
          >
            <p class="stats__value">{{ stat.value }}</p>
            <p class="stats__text">{{ stat.text }}</p>
          </li>
        </ul>
      </div>
    </section>


    <section class="features">
      <div class="features__container">
        <!-- Titre et description générales -->
        <h2 class="features__title">{{ homepage?.features.title }}</h2>
        <p class="features__description">{{ homepage?.features.text }}</p>

        <!-- Liste des cards -->
        <div class="features__cards">
          <div 
            v-for="(feature, index) in homepage?.features.cards" 
            :key="index" 
            :class="['feature-card', { 'feature-card--middle': index === Math.floor((homepage?.features.cards.length - 1) / 2) }]"

          >
            <img 
              v-if="feature.image" 
              :src="feature.image.asset.url" 
              alt="Feature Image" 
              class="feature-card__image"
            />
            <h3 class="feature-card__name">{{ feature.name }}</h3>
            <p class="feature-card__description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>



  </main>
</template>




<style lang="scss">

.hero {
  position: relative;
  height: 100vh; 

  &__video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%; 
    height: 100%; 
    z-index: 1; 
    overflow: hidden;

    .hero__video {
      width: 100%; 
      height: 100%; 
      object-fit: cover; 
    }
  }

  &__content {
    position: absolute;
    top: 40%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    z-index: 2; 
    text-align: center; 
    color: #F1F7F7;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8); 

    .hero__title {
      font-size: 6rem; 
      font-weight: bold;
      margin-bottom: 1rem;
      font-family: $fontTitleFamily;
    }

    .hero__description {
      font-size: 2rem;
      margin-top: 0px;
      font-family: $fontTitleFamily;
      
    }
  }

  &__stats {
    position: absolute;
    bottom: 4rem; 
    left: 2rem; 
    z-index: 2; 
    font-family: $fontTitleFamily;

    .stats__list {
      display: flex;
      gap: 1rem; // Espacement entre les items
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .stats__item {
      border: 2px solid none; // Bordure blanche semi-transparente
      border-radius: 8px;
      background-color: $primaryColor;
      text-align: center;
      min-width: 100px;

      .stats__value {
        font-size: 1.5rem; // Taille de la valeur
        font-weight: bold;
        color: #F1F7F7;
        margin-bottom: 0.5rem;
      }

      .stats__text {
        font-size: 1.2rem;
        color: #F1F7F7;
        margin-top: 5px;
      }
    }
  }
}

.features {
  background-color: #F1F7F7;
  padding: 4rem 2rem;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-family: $fontTitleFamily;
  }

  &__description {
    font-size: 1.2rem;
    margin-bottom: 5rem;
    font-family: $fontTitleFamily;
  }


  &__cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .feature-card {
    background: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
    width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &__image {
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    &__name {
      font-size: 1.5rem;
      margin: 0.5rem 0;
      font-family: $fontTitleFamily;
      color: #333;
    }

    &__description {
      font-size: 1rem;
      color: #666;
      line-height: 1.4;
    }

    // Appliquez le style spécial à la carte du milieu
    &.feature-card--middle {
      background: #001233; // Couleur spéciale pour la carte du milieu

      .feature-card__name {
        font-size: 1.5rem;
      margin: 0.5rem 0;
      font-family: $fontTitleFamily;
      color: white
      }

      .feature-card__description {
        font-size: 1rem;
      color: white;
      line-height: 1.4;
      }
    }
  }
}



</style>