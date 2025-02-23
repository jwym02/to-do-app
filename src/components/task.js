import { createClient } from '@supabase/supabase-js'
import { errorMessages } from 'vue/compiler-sfc';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);
let isSubscribed = false; // Track subscription status

export async function getTasks() {
    // auth check
    const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user:", error);
            return [];
        }
        const user = data?.user;
        if (!user || !user.id) {
            console.error("User not authenticated. No user ID found.");
            return [];
        }
// check if user has added any tasks
    let { data: tasks, taskError } = await supabase
    .from('tasks')
    .select('*')
    .eq("user_id", user.id)

    if (taskError) {
        console.taskError("Supabase taskError:", taskError);
        return [];
    } else if (tasks.length === 0) {
        console.log("No tasks found RAHHHH")
    } else {
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
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error("Error fetching user:", error);
        return { success: false, error: error.message };
      }
      
      const user = data?.user; // Ensure user object is properly accessed
      
      if (!user) {
        console.error("No user found, authentication required.");
        return [];
      }

    let { data: insertedData, insertError } = await supabase
    .from('tasks')
    .insert([
        {
        name: taskData.name,
        due_date: taskData.due_date,
        due_time: taskData.due_time,
        category: taskData.category,
        user_id: user.id,
        // progress: taskData.progress,
        }
    ])

    if (insertError) {
        console.error("Error adding task", insertError);
    } else {
        console.log("Task added", insertedData);
        return {success:true, insertedData};
    }
}

export async function deleteTask(task_id) {
    // auth check
    const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user:", error);
            return [];
        }
        const user = data?.user;
        if (!user || !user.id) {
            console.error("User not authenticated. No user ID found.");
            return [];
        }

    let { data: delition, deleteError } = await supabase
    .from('tasks')
    .delete()
    .eq('task_id', task_id)
    .eq('user_id', user.id);

    if (deleteError) {
        console.error("Error deleting task", deleteError);
    } else {
        console.log("Task deleted", data);
    }
}

export async function editTask(newTask) {
    // auth check
    const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user:", error);
            return [];
        }
        const user = data?.user;
        if (!user || !user.id) {
            console.error("User not authenticated. No user ID found.");
            return [];
        }
    let { data: editData, editError } = await supabase
        .from('tasks')
        .update({ 
            name: newTask.name,
            due_date: newTask.due_date,
            due_time: newTask.due_time,
            category: newTask.category,
            progress: newTask.progress,
        })
        .eq('task_id', newTask.task_id)
        .select();

        if (editError) {
            alert("Error updating task! ", editError.message)
        } else {
            console.log("Task updated", editData);
            return true;
        }

        
}

export async function setStatus(newStatus, task_id) {
    const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("Error fetching user:", error);
            return [];
        }
        const user = data?.user;
        if (!user || !user.id) {
            console.error("User not authenticated. No user ID found.");
            return [];
        }

        let { data: editData, editError } = await supabase
        .from('tasks')
        .update({progress: newStatus})
        .eq('task_id', task_id)
        .select();

        if (editError) {
            alert("Error updating task! ", editError.message)
        } else {
            console.log("Task updated", editData);
            return true;
        }

}