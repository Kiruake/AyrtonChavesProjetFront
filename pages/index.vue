<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

// Récupérer la page d'accueil avec les abonnements Premium et VIP, ainsi que les partenaires
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
    },
    abonnements[] {
      name,
      price,
      description,
      ctaText,
      type,
      image {
        asset->{
          url
        }
      }
    },
    partenaires {
      title,
      description,
      images[] {
        asset->{
          url
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

   <!-- Section Abonnements -->
    <section class="subscriptions">
      <div class="subscriptions__container">
        <!-- Titre de la section -->
        <h2 class="subscriptions__title">Nos Abonnements</h2>

        <!-- Liste des cartes d'abonnement -->
        <div class="subscriptions__cards">
                  <div 
          v-for="(subscription, index) in homepage?.abonnements" 
          :key="index" 
          :class="['subscription-card', subscription.type === 'premium' ? 'subscription-card--premium' : 'subscription-card--vip']"
        >

            <img 
              v-if="subscription.image" 
              :src="subscription.image.asset.url" 
              alt="Subscription Image" 
              class="subscription-card__image"
            />
            <h3 class="subscription-card__name">{{ subscription.name }}</h3>
            <p class="subscription-card__price">{{ subscription.price }}€</p>
            <p class="subscription-card__description">{{ subscription.description }}</p>
            <button class="subscription-card__cta">{{ subscription.ctaText }}</button>
          </div>
        </div>
      </div>
    </section>


     <!-- Partners Section -->
     <section class="partners">
  <div class="partners__container">
    <h2 class="partners__title">{{ homepage?.partenaires.title }}</h2>

    <div class="partners__content">
      <!-- 2x2 Grid of Partner Logos -->
      <div class="partners__images">
        <div v-for="(image, index) in homepage?.partenaires.images" :key="index" class="partner-card">
          <img 
            v-if="image.asset" 
            :src="image.asset.url" 
            alt="Partner Logo" 
            class="partner-card__logo"
          />
        </div>
      </div>

      <!-- Description to the right -->
      <div class="partners__description-right">
        <p class="partners__description">{{ homepage?.partenaires.description }}</p>
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

      @include large-down {
        width: 60%;
      }

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

.subscriptions {
  background-color: $secondaryColor;
  padding: 0rem 2rem 5rem 2rem;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    padding-top: 5rem;
    padding-bottom: 2rem;
    font-family: $fontTitleFamily;
    color: white;
  }

  &__cards {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .subscription-card {
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    text-align: center;
    width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &__image {
      width: 50%;
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

    &__price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #333;
      margin: 0.5rem 0;
    }

    &__description {
      font-size: 1rem;
      color: #666;
      line-height: 1.4;
      margin-bottom: 1rem;
    }

    &__cta {
      padding: 0.8rem 1.6rem;
      background-color: orange;
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s ease;

    }

    // Appliquez le style bleu pour la carte Premium
    &--premium {
      background-color: $primaryColor;
      color: #fff;
    

      &__name, &__description {
        color: #fff;
      }

      &__cta {
        background-color: white;
        color: #fff;
      }
    }


    &--vip {
      background-color: #fff;
      color: #333;
      margin-left: -60px;

      @include medium-down {
        margin-left: 0px;
      }

      &__name, &__description {
        color: #333;
      }

      &__cta {
        background-color: #28a745;
        color: #fff;
      }
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
  }
}

.partners {
  background-color: #F1F7F7;
  padding: 2rem 2rem;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 4rem;
    font-family: $fontTitleFamily;
  }

  &__description {
    font-size: 1.3rem;
    line-height: 1.7;

    @include small-down {
        font-size: 1rem;
      }
  }

  &__content {
    display: flex;
    gap: 5rem;
    justify-content: space-evenly;
    align-items: center;

@include medium-down {
      flex-direction: column;
      gap: 2rem;
    }

  }

  &__images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include medium-down {
      display: flex;
      justify-content: center;
      align-items: center;
    }

  }

  .partner-card {
    display: flex;
    justify-content: center;
    align-items: center;

    &__logo {
      max-width: 110px; /* Redimensionner les images */
      height: auto;
      object-fit: contain;

    @include small-down {
        max-width: 80px; /* Redimensionner les images */
      }

    }
  }

  &__description-right {
    flex: 1;
    max-width: 600px; /* Limiter la largeur de la description */
    text-align: left;
    font-size: 1rem;
    color: #333;

    @include medium-down {
        text-align: justify;
      }
  }
}


</style>