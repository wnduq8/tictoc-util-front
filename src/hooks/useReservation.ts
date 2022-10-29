import { DatePickerProps } from 'antd'
import { useCreateReserModalState, useReservationModalState, useSelectedDateState } from '@src/atoms/reservationState'
import { useCallback, useMemo } from 'react'
import moment from 'moment'
import { useUserState } from '@src/atoms/userState'
import { theme } from '@lib/styles/theme'
import { ReservationResult } from '@lib/api/reservation/getReservation'
import { RoomsResult } from '@lib/api/rooms/getRooms'
import { useRoomsQuery } from '@hooks/query/useRoomsQuery'
import { useReservationQuery } from '@hooks/query/useReservationQuery'
import { timeFormat, displayTimeFormat, dateFormat } from '@lib/constants'
import { Dialog } from 'antd-mobile'

export interface IReservationInfo extends ReservationResult {
  isMe: boolean
  time: string
}

export function useReservation() {
  const [selectedDate, setSelectedDate] = useSelectedDateState()
  const [, setCreateReserModal] = useCreateReserModalState()
  const [, setReservationModal] = useReservationModalState()
  const [userState] = useUserState()

  const { data: rooms, isLoading: isRoomsLoading } = useRoomsQuery('room')
  const {
    data: reservation,
    isLoading: isReservationLoading,
    refetch: refetchReservationList,
  } = useReservationQuery(selectedDate, { cacheTime: 0 })

  const roomList = rooms?.data
  const reservationList = reservation?.data
  const isLoading = isRoomsLoading || isReservationLoading

  const onChangeDatePicker: DatePickerProps['onChange'] = (_, valueString) => {
    setSelectedDate(valueString)
  }

  const onClickReservedCell = (findReservation: IReservationInfo) => {
    setReservationModal({
      open: true,
      data: findReservation,
    })
  }

  const onClickCell = (roomInfo: RoomsResult, time: string, currentReservationList: ReservationResult[]) => {
    if (getIsInvalidDate(time)) {
      Dialog.alert({
        content: '현재 시간보다 이전 시간은 예약 할 수 없습니다.',
        confirmText: '확인',
      })
      return
    }
    const targetTime = moment(time, displayTimeFormat)
    const diffTimeInfo = currentReservationList.reduce((acc, curr) => {
      if (!acc && moment(curr.startTime, displayTimeFormat).isAfter(targetTime)) {
        acc = curr
      }
      return acc
    }, null as any)
    const availableTimeLength = diffTimeInfo
      ? getAvailableTimeLength(targetTime, moment(diffTimeInfo.startTime, displayTimeFormat))
      : 4
    setCreateReserModal({
      open: true,
      data: {
        desc: null,
        name: '',
        reservationDate: selectedDate,
        startTime: moment(time, 'hh:mm').format(timeFormat),
        endTime: '',
        usageTimeLength: availableTimeLength,
        roomName: roomInfo.name,
        roomId: roomInfo.id,
        roomFloor: roomInfo.floor || '',
        headCountString: `${roomInfo.minHeadCount} ~ ${roomInfo.maxHeadCount}인실`,
      },
    })
  }

  const timeArray = Array.from([15], (x, i) => {
    const time = []
    for (let j = i; j < x; j++) {
      time.push(`${j + 7}:00`)
      time.push(`${j + 7}:30`)
    }
    return time
  }).flat()

  const getAvailableTimeLength = useCallback((targetMoment: moment.Moment, diffMoment: moment.Moment) => {
    const diffHours = targetMoment.diff(diffMoment, 'hours', true) * -2
    return diffHours > 4 ? 4 : diffHours
  }, [])

  const isTimeBetween = useCallback((targetTime: string, beforeTime: string, afterTime: string): boolean => {
    if (!targetTime || !beforeTime || !afterTime) {
      return false
    }
    const target = moment(targetTime, displayTimeFormat)
    const before = moment(beforeTime, displayTimeFormat)
    const after = moment(afterTime, displayTimeFormat)

    return target.isBetween(before, after) || before.isSame(target)
  }, [])

  const getCellColor = useCallback((findReservation: IReservationInfo | null) => {
    if (!findReservation) {
      return theme.light.color.gray1
    }
    if (findReservation.isMe) {
      return theme.light.color.primary
    }
    return theme.light.color.secondaryButtonText
  }, [])

  const getIsInvalidDate = useCallback(
    (time?: string): boolean => {
      if (time) {
        const momentTime = moment(time, displayTimeFormat).format(timeFormat)
        return moment(`${selectedDate} ${momentTime}`).isBefore(moment())
      }
      return moment(selectedDate).isBefore(moment().format(dateFormat))
    },
    [selectedDate],
  )

  return {
    onChangeDatePicker,
    timeArray,
    selectedDate,
    isTimeBetween,
    userState,
    getCellColor,
    onClickReservedCell,
    onClickCell,
    roomList,
    reservationList,
    isLoading,
    refetchReservationList,
    getIsInvalidDate,
  }
}
