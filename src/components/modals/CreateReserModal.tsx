import { useCallback, useEffect, useState } from 'react'
import { CenterPopup, Checkbox, Space, Input, TextArea, Button } from 'antd-mobile'
import { useCreateReserModalState, useResetCreateReserModalState } from '@src/atoms/reservationState'
import styled from 'styled-components'
import moment from 'moment'

function CreateReserModal() {
  const [checkboxValue, setCheckboxValue] = useState<number>(0)
  const [createModalState, setCreateModalState] = useCreateReserModalState()
  const onResetCreateModal = useResetCreateReserModalState()
  const { open, data } = createModalState
  const { roomName, roomFloor, headCountString, roomId, reservationDate, startTime, usageTimeLength } = data

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

  console.log(data)
  console.log(availableTimeList)

  useEffect(() => {
    if (!open) {
      setCheckboxValue(0)
    }
  }, [open])
  return (
    <CenterPopup visible={open} onMaskClick={onResetCreateModal}>
      <StyledCenterWrap>
        <div className={'section'}>
          <div className={'create_reser_title'}>회의실</div>
          <div className={'create_reser_contents'}>
            {roomName} ({roomFloor} {headCountString})
          </div>
        </div>
        <div className={'section'}>
          <div className={'create_reser_title'}>예약일시</div>
          <div className={'create_reser_contents'}>
            {reservationDate} / 회의 시작시간 {moment(startTime, 'hh:mm').format('HH:mm')}
          </div>
        </div>
        <div className={'section'}>
          <div className={'create_reser_title'}>사용시간</div>
          <div className={'create_reser_contents'}>
            <Space direction="horizontal" wrap={true}>
              {availableTimeList.map((item) => (
                <Checkbox
                  key={item.value}
                  value={item.value}
                  onChange={(v) => {
                    setCheckboxValue(item.value)
                  }}
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
          <div className={'create_reser_title'}>회의명</div>
          <div className={'create_reser_contents'}>
            <Input placeholder="회의명을 입력해주세요." maxLength={30} />
          </div>
        </div>
        <div className={'section'}>
          <div className={'create_reser_title'}>회의 참고사항</div>
          <div className={'create_reser_contents'}>
            <TextArea placeholder="참고사항이 있다면 입력해주세요." showCount maxLength={300} />
          </div>
        </div>
        <div>
          <Button block size="large" style={{ background: '#FCD400' }}>
            회의실 예약하기
          </Button>
        </div>
      </StyledCenterWrap>
    </CenterPopup>
  )
}

export default CreateReserModal

const StyledCenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 10px;
  max-height: 550px;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .section {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    .create_reser_title {
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.color.gray5};
    }

    .create_reser_contents {
      font-size: 13px;
      font-weight: 400;
      color: ${({ theme }) => theme.color.gray5};
    }
  }
`
