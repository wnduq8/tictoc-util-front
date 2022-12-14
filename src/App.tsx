import { useRef } from 'react'
import './app.css'
import 'antd/dist/antd.css'
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
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '@lib/styles/theme'
import { useThemeState } from '@src/atoms/themeState'
import GlobalCenterPopup from '@components/base/GlobalCenterPopup'
import SettingIndex from '@src/pages/Setting'
import Account from '@src/pages/Setting/account'
import MyReservation from '@src/pages/MyReservation'
import AdminRoot from '@src/pages/Root/AdminRoot'
import { AdminAccount, AdminRoom, AdminUsers } from '@src/pages/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivacyRoot />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/my-reservation', element: <MyReservation /> },
      { path: '/additional-info', element: <AdditionalInfo /> },
      { path: '/setting', element: <SettingIndex /> },
      { path: '/setting/account', element: <Account /> },
    ],
  },
  {
    path: '/login',
    element: <PublicRoot />,
    children: [{ index: true, element: <Login /> }],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    children: [
      { index: true, element: <AdminUsers /> },
      { path: '/admin/account', element: <AdminAccount /> },
      { path: '/admin/rooms', element: <AdminRoom /> },
    ],
  },
])

function App() {
  const [themeType] = useThemeState()

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
          staleTime: 1000 * 5,
          refetchOnWindowFocus: false,
        },
      },
    }),
  ).current

  return (
    <ThemeProvider theme={theme[themeType]}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <TabScrollTopContextProvider>
          <RouterProvider router={router} />
        </TabScrollTopContextProvider>
        <GlobalCenterPopup />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
