import React, { useMemo } from 'react'
import { Col, Modal, Row, Table } from 'antd'
import { useReserByUserModalState, useResetReserByUserModalState } from '@src/atoms/admin/reservationByUserModalState'
import { useAdminReservationByUserQuery } from '@hooks/admin/query/useAdminReservationByUserQuery'
import { dateFormat, displayTimeFormat, LIMIT, timeFormat } from '@lib/constants'
import { StyledAdminRoom } from '@src/pages/Admin/AdminRoom'
import moment from 'moment'
import { IAdminReservationByUser } from '@lib/api/admin/reservation/getAdminReservationByUser'
import { RoomsResult } from '@lib/api/rooms/getRooms'

function ReservationByUserModal() {
  const [reserByUserModalState] = useReserByUserModalState()
  const reset = useResetReserByUserModalState()
  const { open, data } = reserByUserModalState

  const { data: reservationList, isFetching } = useAdminReservationByUserQuery(
    { userId: parseInt(data?.id!, 10), offset: 1, limit: 1000 },
    { cacheTime: 0, enabled: !!data?.id },
  )

  const columns = useMemo(
    () => [
      {
        title: '회의실',
        dataIndex: 'Room',
        render: (room: RoomsResult) => {
          return <span>{room?.name}</span>
        },
      },
      {
        title: '회의명',
        dataIndex: 'name',
      },
      {
        title: '참고사항',
        dataIndex: 'desc',
      },
      {
        title: '예약 일시',
        dataIndex: 'reservationDate',
        render: (_: any, info: IAdminReservationByUser) => {
          return (
            <span>
              {info.reservationDate} {moment(info.startTime, timeFormat).format(displayTimeFormat)} ~{' '}
              {moment(info.endTime, timeFormat).format(displayTimeFormat)}
            </span>
          )
        },
      },
      {
        title: '신청 일시',
        dataIndex: 'createAt',
        render: (date: Date) => {
          return <span>{moment(date).format(`${dateFormat} ${displayTimeFormat}`)}</span>
        },
      },
      {
        title: '취소 일시',
        dataIndex: 'deletedAt',
        render: (date: Date | null) => {
          return date ? <span>{moment(date).format(`${dateFormat} ${displayTimeFormat}`)}</span> : null
        },
      },
    ],
    [reservationList],
  )

  const dataSource = useMemo(() => {
    return reservationList?.data.map((list) => {
      return {
        key: list.id,
        ...list,
      }
    })
  }, [reservationList])

  return (
    <Modal
      open={open}
      style={{ minWidth: 1200 }}
      maskClosable={true}
      closable={!isFetching}
      onCancel={reset}
      footer={null}
    >
      <StyledAdminRoom>
        <Row>
          <Col className={'admin_reservation_title'} span={24}>
            {data?.name}님 회의실 예약 현황
          </Col>
        </Row>
        <Table columns={columns} dataSource={dataSource} loading={isFetching} />
      </StyledAdminRoom>
    </Modal>
  )
}

export default ReservationByUserModal
