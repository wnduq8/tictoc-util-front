import { CenterPopup } from 'antd-mobile'
import { useCenterPopupState, useResetCenterPopupState } from '@src/atoms/centerPopupState'

function GlobalCenterPopup() {
  const [popupState] = useCenterPopupState()
  const reset = useResetCenterPopupState()
  const { visible, View } = popupState

  return (
    <CenterPopup visible={visible} onMaskClick={reset}>
      {View && <View />}
    </CenterPopup>
  )
}

export default GlobalCenterPopup
