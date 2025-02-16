<script setup>
import Header from './header.vue'
import { ref, onMounted } from 'vue'
import { getTasks, subscribeToTaskUpdates, addTask } from './task.js'



const task = ref({
  name: '',
  due_date: '',
  due_time: '',
  category: ''
});
const currentTasks = ref([]) // Make currentTasks reactive
let counter = 0;


async function fetchTasks() {
  currentTasks.value = []; // Clear before fetching
  const currentTasks = await getTasks();
  consolelog("current is " + currentTasks)
  // currentTasks.value = tasks;
}

async function handleAddTask(e) {
  e.preventDefault();
  const result = await addTask(this.task);
  if (result.success) {
    alert("Task added successfully!");
  } else {
    alert("Error adding task.");
}
}

onMounted(() => {
  fetchTasks();
  if (!subscribeToTaskUpdates.isSubscribed) {
    subscribeToTaskUpdates(fetchTasks);
    subscribeToTaskUpdates.isSubscribed = true; // Prevent multiple subscriptions
  }
});
</script>

<template>
  <Header/>
  <div class="container-fluid">
    <div class="intro">
      <h3>Welcome to do your to-do app!</h3>
      <p>What do you want to add today?</p>
      <form @submit="addTask">
        <div class="d-flex flex-column align-items-center">
          Task name: <input type="text" id="task-input" v-model="task.name" class="input-field" placeholder="Add a task"/>
          Task due date: <input type="date" v-model="task.due_date" class="input-field" placeholder="Add a due date">
          Task due time: (24 hour HH/MM)  <input type="text" v-model="task.due_time" class="input-field" placeholder="Add a due time">
          Task category: <input type="text" v-model="task.category" class="input-field" placeholder="Add the category this task belongs to">
        </div>
        <button type="submit" class="addTask">Add</button>
      </form>
    </div>

    <div class="task-list" id="task-list">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Due Date</th>
            <th scope="col">Due Time</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in currentTasks" :key="task.id">
            <td>{{ index + 1 }}</td> 
            <td>{{ task.name }}</td>
            <td>{{ task.due_date }}</td>
            <td>{{ task.due_time.slice(0, 5) }}</td>
            <td>{{ task.category }}</td>
          </tr>
        </tbody>
      </table>
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
    color: orangered;
  }

  .input-field {
    width: 50%;
    margin-bottom: 20px;
  }

  .task-list {
    text-align: center;
    margin-top: 5em;
    display: flex;;
    justify-content: center;
    margin-right: 5em;
    margin-left: 5em;
  }

  .addTask {
    margin-left: 30px;
  }

  button {
    outline: none;
 cursor: pointer;
 border: none;
 padding: 0.9rem 2rem;
 margin: 0;
 font-family: inherit;
 font-size: inherit;
 position: relative;
 display: inline-block;
 letter-spacing: 0.05rem;
 font-weight: 700;
 font-size: 17px;
 border-radius: 500px;
 overflow: hidden;
 background: #66ff66;
 color: white !important;
  }
  button:hover {
    color: black;
  }
  button::before,
  button::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  }

  button::before {
  content: "";
  background: #000;
  width: 120%;
  left: -10%;
  transform: skew(30deg);
  transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  button:hover::before {
  transform: translate3d(100%, 0, 0);
  }

  .format {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
