<script setup>
import Header from './header.vue'
import { ref, onMounted } from 'vue'
import { getTasks, subscribeToTaskUpdates } from './task.js'


const task = ref('')
const currentTasks = ref([]) // Make currentTasks reactive


async function fetchTasks() {
  currentTasks.value = []; // Clear before fetching
  const tasks = await getTasks();
  console.log("Fetched tasks:", tasks);
  currentTasks.value = tasks;
}

function addTask(e) {
  e.preventDefault();
  console.log(task.value)
}

// onMounted(() => {
  fetchTasks();
//   if (!subscribeToTaskUpdates.isSubscribed) {
//     subscribeToTaskUpdates(fetchTasks);
//     subscribeToTaskUpdates.isSubscribed = true; // Prevent multiple subscriptions
//   }
// });
</script>

<template>
  <Header/>
  <div class="container-fluid">
    <div class="intro">
      <h3>Welcome to do your to-do app!</h3>
      <p>What do you want to add today?</p>
      <form @submit="addTask">
        <input type="text" id="task-input" v-model="task" class = "input-field" placeholder="Add a task"/>
        <button type="submit"></button>
      </form>
    </div>

    <div class="task-list" id="task-list">
      <ul>
        <!-- <li v-for="task in currentTasks" :key="task.id">
          {{ task.name }}
        </li> -->
      </ul>
      <p>{{ currentTasks.length}}</p>
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
