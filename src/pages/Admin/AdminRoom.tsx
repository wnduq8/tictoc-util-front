import { useAdminReservation } from '@hooks/admin/useAdminReservation'
import { Table, Button, Row, Col } from 'antd'
import styled from 'styled-components'
import RoomModal from '@components/admin/modal'

function AdminRoom() {
  const { data, columns, isRoomLoading, onClickRow, onClickAddRoomBtn } = useAdminReservation()
  return (
    <StyledAdminRoom>
      <Row>
        <Col span={8} />
        <Col className={'admin_reservation_title'} span={8}>
          회의실 현황
        </Col>
        <Col className={'admin_reservation_title'} span={8}>
          <Button type={'primary'} onClick={onClickAddRoomBtn}>
            회의실 추가
          </Button>
        </Col>
      </Row>
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

export const StyledAdminRoom = styled.div`
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
