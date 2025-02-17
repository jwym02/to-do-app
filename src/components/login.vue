<script setup>
    import { ref, onMounted } from 'vue';
    import { createClient } from '@supabase/supabase-js'
    import { useRouter } from 'vue-router';
    const email = ref('');
    const password = ref('');
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const router = useRouter();
    const errorMsg = ref('');


    async function handleLogin() {
      errorMsg.value = ''; // Reset error message
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) {
        errorMsg.value = error.message;
      } else {
        // Store user info in local storage or state management (Pinia/Vuex)
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to home page
        router.push('/tasks');
      }
    }
</script>

<template>
  <div class="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center bg-black text-white">
    <div class="login-box p-5 shadow-lg">
      <h2 class="mb-4 fw-bold">Welcome back!</h2>

      <form @submit.prevent="handleLogin">
        <div v-if="errorMsg" class="alert alert-danger">{{ errorMsg }}</div>
        <div class="mb-3">
          <label for="email" class="form-label text-gray">Email Address</label>
          <input type="email" id="email" v-model="email" class="form-control input-custom" required />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label text-gray">Password</label>
          <input type="password" id="password" v-model="password" class="form-control input-custom" required />
        </div>

        <button type="submit" class="btn-custom w-100 mt-3">Log in</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Dark Theme */
.bg-black {
  background-color: #000 !important;
}

.text-gray {
  color: #b0b0b0;
}

/* Login Box */
.login-box {
  background: rgba(20, 20, 20, 0.9);
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Input Fields */
.input-custom {
  background: transparent;
  border: 2px solid #444;
  color: white;
  padding: 12px;
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out;
}

.input-custom:focus {
  border-color: #0d6efd;
  box-shadow: 0px 0px 8px rgba(13, 110, 253, 0.6);
  outline: none;
}

/* Login Button */
.btn-custom {
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #0d6efd;
  background: transparent;
  color: #0d6efd;
  border-radius: 8px;
  transition: background 0.4s ease-in-out, color 0.4s ease-in-out;
}

.btn-custom:hover {
  background: linear-gradient(to right, #0d6efd, #4f9df8);
  color: white;
}
</style>