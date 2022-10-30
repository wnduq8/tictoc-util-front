import { Menu } from 'antd'
import { TeamOutlined, CarryOutOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

function AdminMenu() {
  const location = useLocation()

  const defaultSelectedKeys = location.pathname === '/admin' ? ['account'] : location.pathname.split('/')

  const items = [
    {
      label: '계정',
      key: 'account',
      icon: <TeamOutlined />,
      children: [{ key: 'account-1', label: <Link to={'/admin'}>계정</Link> }],
    },
    {
      label: '회의실',
      key: 'reservation',
      icon: <CarryOutOutlined />,
      children: [{ key: 'reservation-1', label: <Link to={'/admin/reservation'}>회의실 추가 및 수정</Link> }],
    },
  ]

  return <Menu mode="horizontal" defaultSelectedKeys={defaultSelectedKeys} items={items} />
}

export default AdminMenu
