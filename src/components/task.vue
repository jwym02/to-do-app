<script setup>
import Header from './header.vue'
import './task.js'
</script>

<template>
  <Header/>
  <div class="container-fluid">
    <div class="intro">
      <h3>Welcome to do your to-do app!</h3>
      <p>What do you want to add today?</p>
      <input type="text" class = "input-field" placeholder="Add a task"/>
    </div>

    <div class="task-list">
      <ul>
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>
  </div>
  


</template>

<style scoped>
  .intro {
    margin-top: 3rem;
    text-align: center;
    color: darkblue;
  }

  .intro p {
    color: aqua;
  }

  .input-field {
    width: 50%;
  }

  .task-list {
    text-align: center;
    margin-top: 5em;
    display: flex;;
    justify-content: center;
  }
</style>
