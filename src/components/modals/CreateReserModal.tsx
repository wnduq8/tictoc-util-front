import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CenterPopup, Checkbox, Space, Input, TextArea, Button, DotLoading } from 'antd-mobile'
import { message } from 'antd'
import { StyledCenterWrap } from './StyledComponens'
import { useCreateReserModalState, useResetCreateReserModalState } from '@src/atoms/reservationState'
import moment from 'moment'
import { useCreateReserMutation } from '@hooks/mutation/useReservationMutation'
import { timeFormat } from '@lib/constants'
import { useReservation } from '@hooks/useReservation'

function CreateReserModal() {
  const [checkboxValue, setCheckboxValue] = useState<number>(0)
  const [createModalState, setCreateModalState] = useCreateReserModalState()
  const onResetModal = useResetCreateReserModalState()
  const { refetchReservationList } = useReservation()
  const { open, data } = createModalState
  const { name, desc, roomName, roomFloor, headCountString, roomId, reservationDate, startTime, usageTimeLength } = data

  const { mutateAsync: createReservation, isLoading } = useCreateReserMutation({
    onSuccess() {
      message.success('회의실 예약이 완료되었습니다.')
      refetchReservationList()
      onResetModal()
    },
    onError() {
      message.error('해당 시간에 회의실이 예약되어 있습니다. 다시 확인 하시고 예약해주세요.')
      refetchReservationList()
      onResetModal()
    },
  })

  const getAvailableTimeText = useCallback((num: number) => {
    switch (num) {
      case 0:
        return '30분'
      case 1:
        return '1시간'
      case 2:
        return '1시간 30분'
      case 3:
        return '2시간'
    }
  }, [])

  const availableTimeList = Array.from([usageTimeLength], (x, i) => {
    const time = []
    for (let j = i; j < x; j++) {
      time.push({
        label: getAvailableTimeText(j),
        value: (j + 1) / 2,
      })
    }
    return time
  }).flat()

  const onChangeInput = useCallback(
    (key: string, value: string) => {
      setCreateModalState({
        open,
        data: {
          ...data,
          [key]: value,
        },
      })
    },
    [open, data],
  )

  const onClickReservation = useCallback(async () => {
    const params = {
      name,
      reservationDate,
      startTime,
      endTime: moment(startTime, timeFormat).add(checkboxValue, 'h').format(timeFormat),
      desc: desc || null,
      roomId: parseInt(roomId, 10),
    }
    await createReservation(params)
  }, [createModalState, checkboxValue, createReservation])

  const disabled = useMemo(() => {
    return !checkboxValue || !name
  }, [checkboxValue, name])

  useEffect(() => {
    if (!open) {
      setCheckboxValue(0)
    }
  }, [open])

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
            {roomName} ({roomFloor} | {headCountString})
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>예약일시</div>
          <div className={'reservation_contents'}>
            {reservationDate} / 회의 시작시간 {moment(startTime, 'hh:mm').format('HH:mm')}
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>
            사용시간<span>*</span>
          </div>
          <div className={'reservation_contents'}>
            <Space direction="horizontal" wrap={true}>
              {availableTimeList.map((item) => (
                <Checkbox
                  key={item.value}
                  value={item.value}
                  onChange={() => setCheckboxValue(item.value)}
                  checked={item.value === checkboxValue}
                  style={{ marginRight: 30 }}
                >
                  {item.label}
                </Checkbox>
              ))}
            </Space>
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>
            회의명<span>*</span>
          </div>
          <div className={'reservation_contents'}>
            <Input
              placeholder="회의명을 입력해주세요."
              style={{ borderBottom: '1px solid #A0A0A0' }}
              value={name}
              onChange={(val) => onChangeInput('name', val)}
              maxLength={30}
            />
          </div>
        </div>
        <div className={'section'}>
          <div className={'reservation_title'}>회의 참고사항</div>
          <div className={'reservation_contents'}>
            <TextArea
              placeholder="참고사항이 있다면 입력해주세요."
              style={{ borderBottom: '1px solid #A0A0A0' }}
              showCount
              maxLength={300}
              value={desc ?? ''}
              onChange={(val) => onChangeInput('desc', val)}
            />
          </div>
        </div>
        <div>
          <Button
            block
            size="large"
            disabled={disabled || isLoading}
            style={{ background: '#FCD400' }}
            onClick={onClickReservation}
          >
            {isLoading ? <DotLoading color="black" /> : '회의실 예약하기'}
          </Button>
        </div>
      </StyledCenterWrap>
    </CenterPopup>
  )
}

export default CreateReserModal
