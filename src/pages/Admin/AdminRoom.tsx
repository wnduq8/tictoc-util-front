import { useAdminReservation } from '@hooks/admin/useAdminReservation'
import { Table } from 'antd'
import styled from 'styled-components'
import RoomModal from '@components/admin/modal'

function AdminRoom() {
  const { data, columns, isRoomLoading, onClickRow } = useAdminReservation()
  return (
    <StyledAdminRoom>
      <div className={'admin_reservation_title'}>회의실 현황</div>
      <Table
        columns={columns}
        dataSource={data}
        loading={isRoomLoading}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => onClickRow(record),
          }
        }}
      />
      <RoomModal />
    </StyledAdminRoom>
  )
}

export default AdminRoom

const StyledAdminRoom = styled.div`
  .admin_reservation_title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: 700;
  }

  .ant-table-row {
    cursor: pointer;
  }

  .ant-table-cell {
    text-align: center;
  }
`
