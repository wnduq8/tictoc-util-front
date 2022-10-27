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

export const reserState = atom<IReservationInfo | null>({
  key: 'reserState',
  default: null,
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

export function useReserState() {
  return useRecoilState(reserState)
}

export function useResetReserState() {
  return useResetRecoilState(reserState)
}
