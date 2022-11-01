import React, { ChangeEvent } from 'react'
import { message, Modal } from 'antd'
import { useRoomModalState, useResetRoomModalState } from '@src/atoms/admin/roomModalState'
import { Button, Input, InputNumber } from 'antd'
import { StyledCenterWrap } from '@components/modals/StyledComponens'
import { useCreateRoomMutation, useUpdateRoomMutation } from '@hooks/admin/mutation/useRoomMutation'
import { UpdateRoomParams } from '@lib/api/admin/rooms/updateRoom'
import { useAdminRoomsQuery } from '@hooks/admin/query/useAdminRoomsQuery'
import { CreateRoomParams } from '@lib/api/admin/rooms/createRoom'

function RoomModal() {
  const [roomState, setRoomState] = useRoomModalState()
  const resetRoomModal = useResetRoomModalState()
  const { refetch } = useAdminRoomsQuery('adminRooms', { cacheTime: 0 })
  const { mutateAsync: updateRoom, isLoading: isUpdateLoading } = useUpdateRoomMutation({
    onSuccess(res) {
      message.success('회의실이 성공적으로 수정되었습니다.')
      resetRoomModal()
      refetch()
    },
    onError() {
      message.error('회의실 수정하는데 실패했습니다. 관리자에 문의해주세요.')
      resetRoomModal()
      refetch()
    },
  })
  const { mutateAsync: createRoom, isLoading: isCreateLoading } = useCreateRoomMutation({
    onSuccess() {
      message.success('회의실이 성공적으로 추가되었습니다.')
      resetRoomModal()
      refetch()
    },
    onError() {
      message.error('회의실 추가하는데 실패했습니다. 관리자에 문의해주세요.')
      resetRoomModal()
      refetch()
    },
  })
  const { open, data } = roomState

  const onChangeStringInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setRoomState({ open, data: { ...data!, [name]: value } })
  }

  const onChangeNumberInput = (num: number | null, name: string) => {
    setRoomState({ open, data: { ...data!, [name]: num } })
  }

  const onClickSubmit = async () => {
    if (!data) {
      return
    }
    if (data?.type === 'create') {
      const params: CreateRoomParams = {
        name: data.name,
        floor: data.floor!,
        minHeadCount: data.minHeadCount,
        maxHeadCount: data.maxHeadCount,
        displayOrder: data.displayOrder,
        status: 'A',
      }
      await createRoom(params)
    } else {
      const params: UpdateRoomParams = {
        id: parseInt(data.id, 10),
        name: data.name,
        floor: data.floor!,
        minHeadCount: data.minHeadCount,
        maxHeadCount: data.maxHeadCount,
        displayOrder: data.displayOrder,
        status: 'A',
      }
      await updateRoom(params)
    }
  }

  if (!data) {
    return null
  }

  const disabled = !(data.name && data.floor && data.minHeadCount && data.maxHeadCount && data.displayOrder)
  const isLoading = isUpdateLoading || isCreateLoading

  return (
    <Modal open={open} maskClosable={false} closable={!isLoading} onCancel={resetRoomModal} footer={null}>
      <StyledCenterWrap>
        <div className={'section'}>
          <div className={'reservation_title'}>회의실</div>
          <div className={'reservation_contents'}>
            <Input
              name="name"
              maxLength={50}
              placeholder="회의실명을 입력해주세요."
              value={data.name}
              onChange={onChangeStringInput}
              showCount
            />
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>위치</div>
          <div className={'reservation_contents'}>
            <Input
              name="floor"
              maxLength={15}
              placeholder="위치를 입력해주세요."
              value={data.floor}
              onChange={onChangeStringInput}
              showCount
            />
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>최소인원</div>
          <div className={'reservation_contents'}>
            <InputNumber
              min={1}
              placeholder="최소인원을 입력해주세요."
              value={data.minHeadCount}
              onChange={(num) => onChangeNumberInput(num, 'minHeadCount')}
            />
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>최대인원</div>
          <div className={'reservation_contents'}>
            <InputNumber
              min={1}
              placeholder="최대인원을 입력해주세요."
              value={data.maxHeadCount}
              onChange={(num) => onChangeNumberInput(num, 'maxHeadCount')}
            />
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>노출순서</div>
          <div className={'reservation_contents'}>
            <InputNumber
              min={1}
              name="displayOrder"
              placeholder="노출순서를 입력해주세요."
              value={data.displayOrder}
              onChange={(num) => onChangeNumberInput(num, 'displayOrder')}
            />
          </div>
        </div>
        <div>
          <Button block size="large" loading={isLoading} disabled={disabled} onClick={onClickSubmit}>
            {data.type === 'create' ? '추가' : '수정'}
          </Button>
        </div>
      </StyledCenterWrap>
    </Modal>
  )
}

export default RoomModal
