import { useUserState } from '@src/atoms/userState'
import { useRoomsQuery } from '@hooks/query/useRoomsQuery'
import { useReservationByUserQuery } from '@hooks/query/useReservationByUserQuery'
import { useMemo } from 'react'
import moment from 'moment'
import { displayTimeFormat, timeFormat } from '@lib/constants'

export function useMyReservation() {
  const [userState] = useUserState()
  const { data: roomList, isFetching: isRoomListLoading } = useRoomsQuery('room')
  const { data: reservationList, isFetching: isReservationListLoading } = useReservationByUserQuery(userState?.id!)

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
      {
        key: 'deletedAt',
        title: '취소여부',
        dataIndex: 'deletedAt',
        render: (_: any, { isDeleted }: { isDeleted: boolean }) => {
          return <span style={{ color: 'red' }}>{isDeleted ? '취소' : ''}</span>
        },
      },
    ]
  }, [])

  const data = useMemo(() => {
    return reservationList?.data?.Reservations?.map((list) => {
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

  const isLoading = isRoomListLoading || isReservationListLoading

  return { isLoading, data, columns }
}
