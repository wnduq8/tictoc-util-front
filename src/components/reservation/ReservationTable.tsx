import React from 'react'
import styled from 'styled-components'
import { IReservationInfo, useReservation } from '@hooks/useReservation'
import { media } from '@lib/styles/media'
import { theme } from '@lib/styles/theme'
import { SpinLoading } from 'antd-mobile'
import moment from 'moment'
import { dateFormat } from '@lib/constants'

function ReservationTable() {
  const {
    roomList,
    reservationList,
    timeArray,
    isTimeBetween,
    userState,
    getCellColor,
    onClickCell,
    onClickReservedCell,
    isLoading,
  } = useReservation()

  return (
    <StyledReservationTable>
      {isLoading ? (
        <SpinLoading style={{ '--size': '48px', margin: '10px auto 0' }} color={'#FCD400'} />
      ) : (
        <>
          <p className={'reservation_guide_text'}>
            캘린더를 클릭하시면 예약<b>(금일 ~ {moment().add(2, 'M').format(dateFormat)})</b> 가능합니다.
          </p>
          <div className={'reservation_table_wrap'}>
            <div className={'reservation_table_box'}>
              <div className={'reservation_table_box_height'}>
                <div className={'reservation_table_header'}>
                  <div className={'room_cell_wrap'}>
                    <div className={'room_cell_empty'} />
                    {roomList?.map(({ id, name }) => {
                      return (
                        <div key={id} className={'room_cell'}>
                          {name}
                        </div>
                      )
                    })}
                  </div>
                </div>
                {timeArray.map((time, idx) => {
                  const isShowText = idx % 2 === 0
                  return (
                    <div className={'table_box_item'} key={String(`${idx}${new Date().getTime()}`)}>
                      <StyledReservationCell background={theme.light.color.background}>
                        {isShowText ? <span>{time}</span> : ''}
                      </StyledReservationCell>
                      {roomList?.map((roomInfo) => {
                        const currentReservationList =
                          reservationList?.filter(({ roomId }) => roomId === roomInfo.id) || []
                        const findReservation: IReservationInfo | null = currentReservationList?.reduce((acc, curr) => {
                          const { startTime, endTime } = curr
                          if (isTimeBetween(time, startTime, endTime)) {
                            const isMe = curr?.userId === userState?.id
                            return { ...curr, time, isMe }
                          }
                          return acc
                        }, null as any)
                        return (
                          <StyledReservationCell
                            key={roomInfo.id}
                            onClick={() => {
                              if (findReservation) {
                                onClickReservedCell(findReservation)
                              } else {
                                onClickCell(roomInfo, time, currentReservationList)
                              }
                            }}
                            background={getCellColor(findReservation)}
                          />
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={'reservation_table_footer'}>
            <div>
              <div className={'reservation_possible'} />
              예약가능
            </div>
            <div>
              <div className={'reservation_impossible'} />
              예약불가
            </div>
            <div>
              <div className={'reservation_me'} />
              내예약
            </div>
          </div>
        </>
      )}
    </StyledReservationTable>
  )
}

export default ReservationTable

const StyledReservationTable = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${media.mobile} {
    width: 100%;
  }

  .reservation_guide_text {
    text-align: center;
  }

  .reservation_table_header {
    display: flex;
    height: 40px;

    .room_cell_empty {
      position: sticky;
      left: 0;
      width: 40px;
      border: 1px solid ${({ theme }) => theme.color.gray3};
      border-bottom: none;
      background: #ffffff;
    }

    .room_cell_wrap {
      display: flex;

      .room_cell {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100px;
        padding: 0 10px;
        font-size: 15px;
        font-weight: 500;
        overflow: scroll;
        white-space: nowrap;
        border: 1px solid ${({ theme }) => theme.color.gray3};
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  .reservation_table_wrap {
    position: relative;
    flex: 1;
    min-height: 940px;
    overflow: scroll;
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }

    .reservation_table_box {
      position: absolute;
      ${media.mobile} {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .reservation_table_box_height {
        flex: 1;
        flex-direction: column;

        ${media.mobile} {
          display: flex;
          align-items: center;
        }

        .table_box_item {
          display: flex;
          flex: 1;
        }
      }
    }
  }

  .reservation_table_footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray5};
    margin-top: 20px;

    ${media.mobile} {
      margin: 20px auto 0;
      width: 500px;
    }

    > div {
      display: flex;
      align-items: center;

      .reservation_possible {
        width: 20px;
        height: 20px;
        background: ${({ theme }) => theme.color.gray1};
        border-radius: 50%;
        margin-right: 10px;
      }

      .reservation_impossible {
        width: 20px;
        height: 20px;
        background: ${({ theme }) => theme.color.secondaryButtonText};
        border-radius: 50%;
        margin-right: 10px;
      }

      .reservation_me {
        width: 20px;
        height: 20px;
        background: ${({ theme }) => theme.color.primary};
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
`

const StyledReservationCell = styled.div<{ background: string }>`
  min-width: 100px;
  border: 1px solid ${({ theme }) => theme.color.gray3};
  height: 30px;
  cursor: pointer;
  background: ${({ background }) => background};

  &:first-of-type {
    position: sticky;
    left: 0;
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: none;
    border-bottom: none;
    cursor: auto;
  }
`
