
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.scss'
import Favorites from './Pages/Favorites'
import Dashboard from './Pages/Dashboard'
import Details from './components/Details'
import TV from './Pages/TV'
import Movies from './Pages/Movies'


const App: React.FC = () => {

  const routes = createBrowserRouter([
    {
      path:'/',
      element:<Dashboard />
    },
    {
      path: '/movies',
      element: <Movies />
    },
    {
      path:'/favorites',
      element:<Favorites />
    },
    {
      path:'/details',
      element:<Details />
    },
    {
      path:'/tv',
      element:<TV/>
    }
  ])

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App