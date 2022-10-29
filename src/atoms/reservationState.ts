import { atom, useRecoilState, useResetRecoilState } from 'recoil'
import moment from 'moment'
import { IReservationInfo } from '@hooks/useReservation'

export const selectedDateState = atom<string>({
  key: 'selectedDateState',
  default: moment().format('YYYY-MM-DD'),
})

export const createReserModalState = atom({
  key: 'createReserModalState',
  default: {
    open: false,
    data: {
      roomName: '',
      desc: null,
      reservationDate: '',
      startTime: '',
      endTime: '',
      roomId: '',
      usageTimeLength: 0,
      name: '',
      roomFloor: '',
      headCountString: '',
    },
  },
})

export const reservationModalState = atom<{ open: boolean; data: IReservationInfo | null }>({
  key: 'reservationModalState',
  default: {
    open: false,
    data: null,
  },
})

export function useSelectedDateState() {
  return useRecoilState(selectedDateState)
}

export function useCreateReserModalState() {
  return useRecoilState(createReserModalState)
}

export function useResetCreateReserModalState() {
  return useResetRecoilState(createReserModalState)
}

export function useReservationModalState() {
  return useRecoilState(reservationModalState)
}

export function useResetReservationModalState() {
  return useResetRecoilState(reservationModalState)
}
