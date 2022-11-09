import React from 'react'
import { Col, Row, Table } from 'antd'
import { StyledAdminRoom } from '@src/pages/Admin/AdminRoom'
import { LIMIT } from '@lib/constants'
import { useAdminUsers } from '@hooks/admin/useAdminUsers'
import { ReservationByUserModal } from '@components/admin/modal'

function AdminUsers() {
  const { columns, data, totalCount, isLoading, setOffset } = useAdminUsers()

  return (
    <StyledAdminRoom>
      <Row>
        <Col className={'admin_reservation_title'} span={24}>
          회원 현황
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          total: totalCount ?? 0,
          pageSize: LIMIT,
          onChange: (pagination) => {
            setOffset(pagination === 1 ? pagination : (pagination - 1) * LIMIT + 1)
          },
        }}
        scroll={{ x: 1300 }}
      />
      <ReservationByUserModal />
    </StyledAdminRoom>
  )
}

export default AdminUsers
