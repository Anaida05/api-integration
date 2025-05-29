import React from 'react'
import FetchComp from './components/FetchComp'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Todo from './components/axios/Todo'
import "./App.css"

const App = () => {
const router = createBrowserRouter([
  {
    path: "/fetch",
    element : <FetchComp/>
  },{
    path : "/",
    element : <Todo/>
  }
])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
