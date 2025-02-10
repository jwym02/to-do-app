<script>

</script>

<template>
    <div class="row">
        <div class="col-6"></div>
        <div class="col-6 header">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/contact">Contact</router-link>
        </div>
    </div>
</template>

<style scoped>
    .row {
        margin-top: 2rem;
        height: 3rem;
        background-color: lightgray;
        align-items: center;
    }
    .header {
        display: flex;
        justify-content: space-around;
    }
</style>