import { createClient } from '@supabase/supabase-js'
import { errorMessages } from 'vue/compiler-sfc';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);
let isSubscribed = false; // Track subscription status

export async function getTasks() {
// check if user has added any tasks
    const { data: tasks, error } = await supabase
    .from('tasks')
    .select('id');

    
    if (error) {
        console.error("Supabase error:", error);
        return [];
        } else if (tasks.length === 0) {
            return "No tasks found"
        } else {
            console.log("Tasks found:", tasks);
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
