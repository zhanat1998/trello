import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../components/mainPage'
import { MainTaskList } from '../components/MainTaskList'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainTaskList />,
  },
])
