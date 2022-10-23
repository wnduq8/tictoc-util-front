import React from 'react'
import { atom, useRecoilState, useResetRecoilState } from 'recoil'

export const centerPopupState = atom<ICenterPopupState>({
  key: 'centerPopupState',
  default: {
    visible: false,
    View: null,
  },
})

export function useCenterPopupState() {
  return useRecoilState(centerPopupState)
}

export function useResetCenterPopupState() {
  return useResetRecoilState(centerPopupState)
}

export interface ICenterPopupState {
  visible: boolean
  View: React.FunctionComponent | null
}
