import { useAdminRoomsQuery } from '@hooks/admin/query/useAdminRoomsQuery'
import { useCallback, useMemo } from 'react'
import { RoomsResult } from '@lib/api/rooms/getRooms'
import { useRoomModalState } from '@src/atoms/admin/roomModalState'

export function useAdminReservation() {
  const { data: roomList, isFetching: isRoomLoading } = useAdminRoomsQuery('adminRooms', { cacheTime: 0 })
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
    ]
  }, [])

  const onClickAddRoomBtn = useCallback(() => {
    setRoomModal({
      open: true,
      data: {
        name: '',
        floor: '',
        minHeadCount: 0,
        maxHeadCount: 0,
        displayOrder: 0,
        status: 'A',
        type: 'create',
        id: '',
        createAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    })
  }, [])

  const onClickRow = useCallback((record: RoomsResult) => {
    setRoomModal({
      open: true,
      data: { ...record, type: 'update' },
    })
  }, [])

  return { data: roomList?.data ?? [], columns, isRoomLoading, onClickRow, onClickAddRoomBtn }
}
