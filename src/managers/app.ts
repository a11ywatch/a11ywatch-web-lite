import { observable, action } from 'mobx'

const defaultSnackBar = {
  title: '',
  type: 'message',
  open: false,
  autoClose: false,
  showBtn: false, // show btn
}

// determine if account needs upgrade
export const upgradeRequired = (text: string) =>
  text.includes('max websites added') ||
  text.includes('upgrade your account') ||
  text.includes('you hit your scan limit for the day') ||
  text === 'RATE EXCEEDED: Please try again later or upgrade your account.'

class AppManager {
  @observable
  overlay = false

  @observable
  snackbar = defaultSnackBar

  @observable
  modalActive = false

  // @observable
  // portals: string[] = []
  readonly portals = observable<any>([])

  dismissAnnotation = () => {}

  @action
  toggleOverlay = (method?: any, open?: boolean) => {
    if (this.overlay) {
      this.dismissAnnotation()
    }
    this.dismissAnnotation = method
    this.overlay = typeof open !== 'undefined' ? open : !this.overlay
  }

  @action clearPortals = () => {
    this.portals.clear()
  }

  @action
  setPortals = (portals: any) => {
    this.portals.push(portals)
  }

  @action
  removePortal = (index: number) => {
    // todo pop it off array
    const dIndex = this.portals.indexOf(index)
    if (dIndex > -1) {
      this.portals.splice(dIndex, 1)
    }
    // this.portals[index] = null
  }

  @action resetSnackbar = () => {
    this.snackbar = { ...defaultSnackBar }
  }

  @action closeSnack = () => {
    this.snackbar.open = false
  }

  @action setModalActive = (active: boolean) => {
    this.modalActive = active
  }

  @action
  toggleSnack = (
    open: boolean,
    title: any,
    type: 'message' | 'success' | 'error' = 'message',
    autoClose?: boolean,
    showBtn?: boolean
  ): void => {
    const snackTitle = Array.isArray(title)
      ? title.length
        ? title[0].message
        : 'Error'
      : title

    this.snackbar = {
      title: snackTitle,
      type,
      open,
      autoClose: autoClose || false,
      showBtn: !!showBtn,
    }
  }
}

const manager = new AppManager()

export { manager as AppManager }
