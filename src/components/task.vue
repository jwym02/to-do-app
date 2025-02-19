<script setup>
import Header from './header.vue'
import { ref, onMounted } from 'vue'
import { getTasks, subscribeToTaskUpdates, addTask, deleteTask, editTask } from './task.js'
import { createClient } from '@supabase/supabase-js'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

const task = ref({
  name: '',
  due_date: '',
  due_time: '',
  category: ''
});
const currentTasks = ref([]) // Make currentTasks reactive
let counter = 0;

const showModal = ref(false);
function openModal(task) {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

async function fetchTasks() {

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error fetching user:", error);
    return;
  }

  const user = data?.user;
  if (!user) {
    alert("You must be logged in to view tasks!");
    return;
  }

  currentTasks.value = []; // Clear before fetching
  const tasks = await getTasks();
  // console.log("current is " + tasks)
  currentTasks.value = tasks;
}

async function handleAddTask(e) {
  e.preventDefault();
  const result = await addTask(task.value);
  if (result.success) {
    alert("Task added successfully!");
  } else {
    alert("Error adding task.");
}
}

async function handleDeleteTask(id) {
  const result = await deleteTask(id);
  console.log("task id is " + id)
}

async function saveEditChanges(task) {
  const result = await editTask(task);
  console.log("Task is edited.")
}



onMounted( async () => {
    const { data: user } = await supabase.auth.getUser();
    if (!user) {
    alert("You must be logged in to view tasks!");
    return;
  }



  fetchTasks();
  if (!subscribeToTaskUpdates.isSubscribed) {
    subscribeToTaskUpdates(fetchTasks);
    subscribeToTaskUpdates.isSubscribed = true; // Prevent multiple subscriptions
  }
});
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <Header/>
  <div class="container-fluid">
    <div class="intro">
      <h3>Welcome to do your to-do app!</h3>
      <p>What do you want to add today?</p>
      <form @submit="handleAddTask">
        <div class="d-flex flex-column align-items-center">
          Task name: <input type="text" id="task-input" v-model="task.name" class="input-field" placeholder="Add a task"/>
          Task due date: <input type="date" v-model="task.due_date" class="input-field" placeholder="Add a due date">
          Task due time: (24 hour HH:MM)  <input type="text" v-model="task.due_time" class="input-field" placeholder="Add a due time">
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
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in currentTasks" :key="task.task_id" >
            <td>{{ index + 1 }}</td> 
            <td>{{ task.name }}</td>
            <td>{{ task.due_date }}</td>
            <td>{{ task.due_time.slice(0, 5) }}</td>
            <td>{{ task.category }}</td>
            <td class="buttons">
              <button style="font-size:24px" @click="handleDeleteTask(task.task_id)" class="taskButtons">
                <i class="fa fa-trash-o"></i>
              </button>
              <button type="button" class="btn btn-primary edit-button taskButtons" @click="openModal(task)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" id="editTask" tabindex="-1" role="dialog" aria-labelledby="editTaskTitle" aria-hidden="true" :class="{ show: showModal }" v-if="showModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editTaskTitle">Edit Task</h5>
          </div>
          <div class="modal-body">
            <p>{{ this.task.id }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary"  @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="saveEditChanges">Save changes</button>
          </div>
        </div>
      </div>
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
    margin-bottom: 60px;
  }

  .addTask {
    margin-left: 30px;
  }

  .addTask, .button {
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

  .format {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fa {
    color: red;
    outline: none;
  }

  .buttons {
    align-items: center;
  }

  .edit-button { 
    height: 100%;
  }

  .taskButtons {
    height: 50px;
  }
  .modal {
  display: block; /* Ensure modal is visible when triggered */
  background: rgba(0, 0, 0, 0.5); /* Darken background */
}

.modal.fade {
  opacity: 1;
  transition: opacity 5s ease-in-out;
}
</style>
