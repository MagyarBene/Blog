
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Posts } from './pages/Posts'
import { AddEditPost } from './pages/AddEditPost'
import { Auth } from './pages/Auth'
import { PwReset } from './pages/PwReset'
import { Profile } from './pages/Profile'
import { Admin } from './pages/Admin'
import { Header } from './components/Header'
import { NotFound } from './pages/NotFound'
import { DeleteAcc } from './pages/DeleteAcc'
import { SinglePost } from './pages/SinglePost'


const router = createBrowserRouter([
  {element:<Header/>,
    children:[
      {path:'/',element:<Home />},
      {path:'/posts',element:<Posts />},
      {path:'/create',element:<AddEditPost />},
      {path:'/update/:id',element:<AddEditPost />},
      {path:'/auth/in',element:<Auth />},
      {path:'/auth/up',element:<Auth />},
      {path:'/pwreset',element:<PwReset />},
      {path:'/profile',element:<Profile />},
      {path:'/admin',element:<Admin />},
      {path:'*',element:<NotFound />},
      {path:'/delete',element:<DeleteAcc/>},
      {path:'/singlepost/:id',element:<SinglePost/>},
    ]
  }
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }}
)
function App() { 
  return <RouterProvider router={router}   future={{v7_startTransition: true,}}/>

}

export default App
