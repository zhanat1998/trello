import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../components/mainPage'
import TableAntd from '../components/tableAntd'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
])
