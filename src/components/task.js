import { createClient } from '@supabase/supabase-js'
import { errorMessages } from 'vue/compiler-sfc';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);
let isSubscribed = false; // Track subscription status

export async function getTasks() {
// check if user has added any tasks
    let { data: tasks, error } = await supabase
    .from('tasks')
    .select('*');

    if (error) {
        console.error("Supabase error:", error);
        return [];
    } else if (tasks.length === 0) {
        console.log("No tasks found RAHHHH")
    } else {
        console.log("i found some!")
        return tasks || [];
    }
}

// Real-time listener for changes in 'tasks' table
export function subscribeToTaskUpdates(callback) {

    if (isSubscribed) return; // Prevent multiple subscriptions
    supabase
        .channel('tasks-channel')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'tasks' },
            (payload) => {
                console.log('Task table updated:', payload);
                callback(); // Re-fetch tasks when changes occur
            }
        )
        .subscribe();
    isSubscribed = true; // Mark as subscribed
}

export async function addTask(taskData) {
    console.log("taskData received:", taskData);
    let { data, error } = await supabase
    .from('tasks')
    .insert([
        {
        name: taskData.name,
        due_date: taskData.due_date,
        due_time: taskData.due_time,
        category: taskData.category
        }
    ])

    if (error) {
        console.error("Error adding task", error);
    } else {
        console.log("Task added", data);
        return {success:true, data};
    }
}

export async function deleteTask(id) {
    let { data, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

    if (error) {
        console.error("Error deleting task", error);
    } else {
        console.log("Task deleted", data);
        return {success:true, data};
    }
}