import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import './index.css'
import { router } from './utils/routes'
import { RouterProvider } from 'react-router'
import { store } from './utils/redux/store'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
