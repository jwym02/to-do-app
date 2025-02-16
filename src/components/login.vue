<script setup>
    import { ref, onMounted } from 'vue'

    onMounted(() => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        const metaTag = document.createElement('meta');
        metaTag.name = 'google-signin-client_id';
        metaTag.content = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;
        document.head.appendChild(metaTag);
    })


    async function onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
</script>

<template>
    <h2>hi!!</h2>
    <!-- Google Sign-in button -->
    <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
</template>

<style scoped>

</style>