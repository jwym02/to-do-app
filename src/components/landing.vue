<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToLogin = () => {
  router.push('/setup'); // Update to match your login route
};
</script>

<template>
    <div class="container-fluid min-vh-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
      <!-- Hero Section -->
      <div class="col-md-8">
        <h1 class="display-4 fw-bold text-white">Stay Organized, Stay Productive</h1>
        <p class="lead text-white">
          Manage your tasks efficiently with our smart to-do list. 
          Plan, track, and complete your tasks effortlessly.
        </p>
        <button class="btn btn-primary btn-lg mt-3 unique" @click="navigateToLogin">
          Get Started
        </button>
      </div>
  
      <!-- Features Section -->
      <div class="row mt-5 col-md-8">
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm p-4">
            <h3 class="text-primary">📅 Easy Task Management</h3>
            <p class="text-muted">Create, update, and track your tasks all in one place.</p>
          </div>
        </div>
  
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm p-4">
            <h3 class="text-success">📌 Smart Reminders</h3>
            <p class="text-muted">Never forget important tasks with customisable automatic reminders.</p>
          </div>
        </div>
  
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm p-4">
            <h3 class="text-danger">🔒 Secure & Reliable</h3>
            <p class="text-muted">Your data is safe within data storages.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .card {
    border: none;
    border-radius: 12px;
    transition: transform 0.3s ease-in-out;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .container-fluid {
    background: linear-gradient(to bottom, #0D0D2B, #22206E);
  }

  .unique {
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #0d6efd; /* Blue border */
  background: white;
  color: black;
  border-radius: 8px;
  transition: background 0.4s ease-in-out, color 0.4s ease-in-out;
  position: relative;
  overflow: hidden;
}

/* ✅ Hover Effect: Blue gradient fades from left to right */
.unique:hover {
  background: linear-gradient(to right, #0d6efd, #4f9df8);
  color: white;
  border: 2px solid #0d6efd;
}

  </style>
  