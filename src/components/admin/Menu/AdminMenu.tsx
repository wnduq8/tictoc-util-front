import { Menu } from 'antd'
import { TeamOutlined, CarryOutOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

function AdminMenu() {
  const location = useLocation()

  const defaultSelectedKeys = location.pathname === '/admin' ? ['account'] : location.pathname.split('/')

  const menuItems = [
    {
      key: 'account',
      icon: <TeamOutlined />,
      label: <Link to={'/admin'}>계정</Link>,
    },
    {
      key: 'reservation',
      icon: <CarryOutOutlined />,
      label: <Link to={'/admin/reservation'}>회의실</Link>,
    },
  ]

  return <Menu mode="horizontal" defaultSelectedKeys={defaultSelectedKeys} items={menuItems} />
}

export default AdminMenu
