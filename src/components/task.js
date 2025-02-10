import { createClient } from '@supabase/supabase-js'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);

// check if user has added any tasks
let { data: tasks, error } = await supabase
  .from('tasks')
  .select('*')

if (error) {
    console.error(error)
    } else if (tasks.length === 0) {
        console.log('No tasks added yet')
    } else {
        console.log('Tasks:', tasks)
    }   