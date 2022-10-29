import React from 'react'
import styled from 'styled-components'
import { media } from '@lib/styles/media'
import { DatePicker } from 'antd'
import moment from 'moment'
import { dateFormat } from '@lib/constants'
import { useReservation } from '@hooks/useReservation'
import ReservationTable from '@components/reservation/ReservationTable'

function ReservationTableWrap() {
  const { onChangeDatePicker, selectedDate } = useReservation()

  const DateInputWrap = () => {
    return (
      <StyledDateInputWrap>
        <div className={'date_input_title'}>예약날짜</div>
        <DatePicker
          onChange={onChangeDatePicker}
          value={moment(selectedDate)}
          format={dateFormat}
          allowClear={false}
          disabledDate={(d) =>
            !d ||
            d.isSameOrBefore(moment().subtract(2, 'M').format(dateFormat)) ||
            d.isAfter(moment().add(2, 'M').format(dateFormat))
          }
        />
      </StyledDateInputWrap>
    )
  }

  return (
    <StyledReservationTableWrap>
      <Line />
      <DateInputWrap />
      <Line />
      <ReservationTable />
    </StyledReservationTableWrap>
  )
}

export default ReservationTableWrap

const StyledReservationTableWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 20px;

  ${media.mobile} {
    justify-content: center;
    align-items: center;
  }
`

const Line = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.color.gray0};
`

const StyledDateInputWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;

  .date_input_title {
    font-size: 15px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.gray5};
    margin-right: 20px;
  }
`
