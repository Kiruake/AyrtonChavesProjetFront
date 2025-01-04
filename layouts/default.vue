<script lang="ts" setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
    <div class="l-default">
    <Header />
    <div class="l-default__content">
        <slot />
    </div>
    <Footer />
    </div>
</template>

<style lang="scss">
.l-default {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    &__content {
        flex: 1;
    }
}
</style>
