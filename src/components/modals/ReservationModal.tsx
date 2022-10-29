import React, { useCallback } from 'react'
import { Button, CenterPopup, Dialog, DotLoading } from 'antd-mobile'
import { StyledCenterWrap } from './StyledComponens'
import { useReservationModalState, useResetReservationModalState } from '@src/atoms/reservationState'
import moment from 'moment'
import { displayTimeFormat, timeFormat } from '@lib/constants'
import { useDeleteReserMutation } from '@hooks/mutation/useReservationMutation'
import { useReservation } from '@hooks/useReservation'
import { message } from 'antd'

function ReservationModal() {
  const [reservationModal] = useReservationModalState()
  const onResetModal = useResetReservationModalState()
  const { refetchReservationList, getIsInvalidDate } = useReservation()
  const { mutateAsync: deleteReservation, isLoading } = useDeleteReserMutation({
    onSuccess() {
      message.success('회의실 예약이 삭제되었습니다.')
      refetchReservationList()
      onResetModal()
    },
    onError() {
      message.error('회의실 예약 삭제가 실패했습니다. 관리자에게 문의해주세요.')
      refetchReservationList()
      onResetModal()
    },
  })

  const { open, data } = reservationModal
  const roomFloor = data?.Room.floor ?? ''
  const headCountString = `${data?.Room.minHeadCount ?? ''} ~ ${data?.Room.maxHeadCount ?? ''}인실`

  const onClickDeleteBtn = useCallback(() => {
    if (!data?.id) {
      return
    }
    Dialog.confirm({
      content: '해당 예약을 삭제하시겠습니까?',
      cancelText: <span style={{ fontSize: 15, fontWeight: 400 }}>취소</span>,
      confirmText: <span style={{ fontSize: 15, fontWeight: 400 }}>삭제</span>,
      onConfirm: () => {
        deleteReservation(parseInt(data?.id))
      },
    })
  }, [data?.id])

  return (
    <CenterPopup
      visible={open}
      onMaskClick={() => {
        if (isLoading) {
          return
        }
        onResetModal()
      }}
    >
      <StyledCenterWrap>
        <div className={'section'}>
          <div className={'reservation_title'}>회의실</div>
          <div className={'reservation_contents'}>
            {data?.Room.name} ({roomFloor} | {headCountString})
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>예약일시</div>
          <div className={'reservation_contents'}>
            {data?.reservationDate} {moment(data?.startTime, timeFormat).format(displayTimeFormat)} ~
            {moment(data?.endTime, timeFormat).format(displayTimeFormat)}
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>예약자</div>
          <div className={'reservation_contents'}>
            <div>{data?.User.department ?? ''}</div>
            <div>
              {data?.User.name ?? ''} ({data?.User.email ?? ''})
            </div>
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>회의명</div>
          <div className={'reservation_contents'}>{data?.name ?? ''}</div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>참고사항</div>
          <div className={'reservation_contents'}>{data?.desc ?? ''}</div>
        </div>
        {data?.isMe && (
          <div>
            <Button
              block
              size="large"
              disabled={isLoading || getIsInvalidDate()}
              style={{ background: '#ff7a2a' }}
              onClick={onClickDeleteBtn}
            >
              {isLoading ? <DotLoading color="black" /> : '회의실 예약 취소하기'}
            </Button>
          </div>
        )}
      </StyledCenterWrap>
    </CenterPopup>
  )
}

export default ReservationModal
