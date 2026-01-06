import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import useAuthStore from './store/authStore.js'
import { supabase } from './lib/supabaseClient.js'

function AuthListener() {
  const initAuth = useAuthStore((s) => s.initAuth)

  useEffect(() => {
    initAuth();

    const {
      data: { subscription } 
    } = supabase.auth.onAuthStateChange(() => {
        initAuth()
      })

      return () => subscription.unsubscribe()
  }, [])
  return null
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthListener />
      <RouterProvider router={router}/>
  </StrictMode>,
)
