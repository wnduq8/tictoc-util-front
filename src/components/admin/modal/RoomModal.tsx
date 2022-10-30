import { Modal } from 'antd'
import { useRoomModalState, useResetRoomModalState } from '@src/atoms/admin/roomModalState'

function RoomModal() {
  const [roomState] = useRoomModalState()
  const resetRoomModal = useResetRoomModalState()
  const { open, data } = roomState
  if (!data) {
    return null
  }
  console.log(data)

  return (
    <Modal open={open} onCancel={resetRoomModal} footer={null}>
      <p>asd</p>
    </Modal>
  )
}

export default RoomModal
