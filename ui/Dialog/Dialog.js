import DeviceDetection from 'components/Services/DeviceDetection'

import ModalDialog, { ModalDialogContent, ModalDialogControls } from './ModalDialog'
import FullScreenDialog, {
  FullScreenDialogContent,
  FullScreenDialogControls,
} from './FullscreenDialog'

const { isMobileOrTablet } = DeviceDetection

const getComponents = () => {
  if (isMobileOrTablet) {
    return {
      Dialog: FullScreenDialog,
      DialogContent: FullScreenDialogContent,
      DialogControls: FullScreenDialogControls,
    }
  }
  return {
    Dialog: ModalDialog,
    DialogContent: ModalDialogContent,
    DialogControls: ModalDialogControls,
  }
}

const { Dialog, DialogContent, DialogControls } = getComponents()

export default Dialog
export { DialogContent, DialogControls }
