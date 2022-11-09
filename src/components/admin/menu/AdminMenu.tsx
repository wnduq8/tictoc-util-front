import { Menu } from 'antd'
import { TeamOutlined, CarryOutOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StyledLogo } from '@components/base/DesktopHeader'
import UserAddon from '@components/base/UserAddon'
import { useUserState } from '@src/atoms/userState'

function AdminMenu() {
  const location = useLocation()
  const navigate = useNavigate()
  const [userState] = useUserState()
  const defaultSelectedKeys = location.pathname === '/admin' ? ['user'] : location.pathname.split('/')

  const items = [
    {
      label: '회원 관리',
      key: 'account',
      icon: <TeamOutlined />,
      children: [
        { key: 'user', label: <Link to={'/admin'}>회원 정보 조회</Link> },
        { key: 'account', label: <Link to={'/admin/account'}>이메일 계정 추가</Link> },
      ],
    },
    {
      label: '회의실 관리',
      key: 'reservation',
      icon: <CarryOutOutlined />,
      children: [{ key: 'rooms', label: <Link to={'/admin/rooms'}>회의실 추가 및 수정</Link> }],
    },
  ]

  return (
    <>
      <StyledLogo onClick={() => navigate('/')} style={{ position: 'fixed', top: -25, left: 10, cursor: 'pointer' }} />
      <Menu mode="horizontal" style={{ paddingLeft: 100 }} defaultSelectedKeys={defaultSelectedKeys} items={items} />
      {userState && (
        <div style={{ position: 'absolute', top: 7, right: 20, cursor: 'pointer' }}>
          <UserAddon username={userState.name} profileImage={userState.profileImage} isAdmin={userState.isAdmin} />
        </div>
      )}
    </>
  )
}

export default AdminMenu
