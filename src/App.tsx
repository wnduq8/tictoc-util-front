import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '@src/pages/Home'
import Login from '@src/pages/Login'
import NotFound from '@src/pages/NotFound'
import PublicRoot from '@src/pages/Root/PublicRoot'
import PrivacyRoot from '@src/pages/Root/PrivacyRoot'
import AdditionalInfo from '@src/pages/AdditionalInfo'
import GlobalStyle from '@src/GlobalStyle'
import { TabScrollTopContextProvider } from '@src/contexts/TabScrollTopContext'
import { ThemeProvider } from 'styled-components'
import { theme } from '@lib/styles/theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivacyRoot />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/additional-info', element: <AdditionalInfo /> },
    ],
  },
  {
    path: '/login',
    element: <PublicRoot />,
    children: [{ index: true, element: <Login /> }],
  },
])

function App() {
  return (
    <ThemeProvider theme={theme['light']}>
      <GlobalStyle />
      <TabScrollTopContextProvider>
        <RouterProvider router={router} />
      </TabScrollTopContextProvider>
    </ThemeProvider>
  )
}

export default App
