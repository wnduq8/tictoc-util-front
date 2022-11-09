import { useRoomsQuery } from '@hooks/query/useRoomsQuery'
import { useReservationByUserQuery } from '@hooks/query/useReservationByUserQuery'
import { useMemo, useState } from 'react'
import moment from 'moment'
import { displayTimeFormat, LIMIT, timeFormat } from '@lib/constants'

export function useMyReservation() {
  const [offset, setOffset] = useState<number>(1)
  const { data: roomList, isFetching: isRoomListLoading } = useRoomsQuery('room')
  const { data: reservationList, isFetching: isReservationListLoading } = useReservationByUserQuery(
    { offset, limit: LIMIT },
    {
      cacheTime: 0,
    },
  )

  const columns = useMemo(() => {
    return [
      {
        key: 'roomName',
        title: '회의실',
        dataIndex: 'roomName',
      },
      {
        key: 'name',
        title: '회의명',
        dataIndex: 'name',
      },
      {
        key: 'desc',
        title: '참고사항',
        dataIndex: 'desc',
        render: (text: string) => {
          return <span style={{ fontSize: '14px' }}>{text}</span>
        },
      },
      {
        key: 'reservationDate',
        title: '예약 시간',
        dataIndex: 'reservationDate',
      },
    ]
  }, [])

  const data = useMemo(() => {
    return reservationList?.data?.data?.Reservations?.map((list) => {
      return {
        id: list.id,
        roomName: roomList?.data?.find(({ id }) => id === list.roomId)?.name,
        name: list.name,
        desc: list.desc,
        reservationDate: `${list.reservationDate} ${moment(list.startTime, timeFormat).format(
          displayTimeFormat,
        )} ~ ${moment(list.endTime, timeFormat).format(displayTimeFormat)}`,
        isDeleted: !!list.deletedAt,
      }
    })
  }, [reservationList, roomList])

  const totalCount = useMemo(() => reservationList?.data.totalCount, [reservationList])

  const isLoading = isRoomListLoading || isReservationListLoading

  return { isLoading, data, columns, totalCount, LIMIT, setOffset }
}
