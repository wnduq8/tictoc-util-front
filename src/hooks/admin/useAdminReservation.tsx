import { useAdminRoomsQuery } from '@hooks/query/admin/useAdminRoomsQuery'
import { useCallback, useMemo } from 'react'
import { RoomsResult } from '@lib/api/rooms/getRooms'
import { useRoomModalState } from '@src/atoms/admin/roomModalState'

export function useAdminReservation() {
  const { data: roomList, isLoading: isRoomLoading } = useAdminRoomsQuery('adminRooms')
  const [_, setRoomModal] = useRoomModalState()

  const columns = useMemo(() => {
    return [
      {
        key: 'name',
        title: '회의실',
        dataIndex: 'name',
      },
      {
        key: 'floor',
        title: '위치',
        dataIndex: 'floor',
      },
      {
        key: 'minHeadCount',
        title: '최소 인원 (명)',
        dataIndex: 'minHeadCount',
      },
      {
        key: 'maxHeadCount',
        title: '최대 인원 (명)',
        dataIndex: 'maxHeadCount',
      },
      {
        key: 'displayOrder',
        title: '노출순서',
        dataIndex: 'displayOrder',
      },
      {
        key: 'status',
        title: '노출여부',
        dataIndex: 'status',
        render: (text: string) => {
          return <div>{text === 'A' ? 'O' : 'X'}</div>
        },
      },
      {
        key: 'deletedAt',
        title: '삭제여부',
        dataIndex: 'deletedAt',
        render: (deletedAt: string | null) => {
          return <span style={{ color: 'red' }}>{deletedAt ? '삭제' : ''}</span>
        },
      },
    ]
  }, [])

  const onClickRow = useCallback((record: RoomsResult) => {
    setRoomModal({
      open: true,
      data: { ...record, type: 'update' },
    })
  }, [])

  return { data: roomList?.data ?? [], columns, isRoomLoading, onClickRow }
}