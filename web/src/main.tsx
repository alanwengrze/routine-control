import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'

import { 
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom'

 import Root from './routes/root'
 import { ErrorPage } from './error-page'
 import { Login } from './routes/Login'
 import { Home } from './routes/Home'
 import { HomeLog } from './routes/HomeLog'
 import { Cadastrar } from './routes/Cadastrar'
 import { Logado } from './routes/Logado'

 interface ItemProps{
  Item: any;
 }

 const Private = ({Item}:ItemProps)=>{
  const signed = false;
  return signed? <Item /> : <Login />
 }

 const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children:[
    
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/cadastrar",
    element: <Cadastrar />,
  },
  {
    path:"/homeLog",
    element: <HomeLog/>,
  },
  {
    path:"/logado",
    element:<Logado/>
  }
 
 ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>,
)
