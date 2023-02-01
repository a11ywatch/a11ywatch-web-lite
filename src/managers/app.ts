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
  text === 'RATE EXCEEDED: Please try again later or upgrade your account.' ||
  text ===
    'Max websites added. Please upgrade your account or remove a website.' ||
  text ===
    'Scan limit reached for the day. Upgrade your account or wait until your limit resets tomorrow.'

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

  clearTimer: NodeJS.Timeout | null = null

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
    autoClose: boolean = true,
    showBtn?: boolean
  ): void => {
    this.snackbar = {
      title: Array.isArray(title)
        ? title.length
          ? title[0].message
          : 'Error'
        : title,
      type,
      open,
      autoClose: autoClose || false,
      showBtn: !!showBtn,
    }

    this.clearTimer && clearTimeout(this.clearTimer)

    if (autoClose) {
      this.clearTimer = setTimeout(() => {
        this.resetSnackbar()
      }, 4000)
    }
  }
}

const manager = new AppManager()

export { manager as AppManager }
