import { createRouter, createWebHistory } from 'vue-router'
import { createClient } from '@supabase/supabase-js'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabase = createClient(supabaseUrl, supabaseKey);
import Setup from '../components/setup.vue'
import LandingPage from '../components/landing.vue'
import Login from '../components/login.vue'
import Tasks from '../components/task.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/setup',
      component: Setup,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/tasks',
      component: Tasks,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data: session } = await supabase.auth.getSession();
    const user = session?.session?.user;
    if (!user) {
      next("/login"); // Redirect to login if not authenticated
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
