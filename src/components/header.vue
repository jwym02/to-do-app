<script setup>
import { useRouter } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);
const router = useRouter();

async function handleLogout() {
  await supabase.auth.signOut();
  localStorage.removeItem("user"); // Clear stored user
  router.push("/"); // Redirect to login page
}
</script>

<template>
    <div class="container-fluid">
        <div class="row">
        <div class="col-6"></div>
        <div class="col-6 header">
            <router-link to="/about">About</router-link>
            <router-link to="/contact">Contact</router-link>
            <button class="btn btn-danger" @click="handleLogout">Logout</button>
        </div>
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