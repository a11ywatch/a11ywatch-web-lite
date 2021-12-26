/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { computed, observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'
import { isSameDay } from 'date-fns'
import { userModel } from '@app/data'
import { parseJwt } from '@app/lib/auth'
import { SUPER_MODE } from '@app/configs'

const USER_DEFAULTS = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  jwt: undefined,
}

interface User {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  jwt?: string
}

class UserManager {
  @persist('object')
  @observable
  user: User

  constructor() {
    this.user = USER_DEFAULTS
    this.hydrate()
  }

  @action
  hydrate = async () => {
    if (typeof window === 'undefined') {
      return
    }

    const pour = create({
      storage: window?.localStorage,
      jsonify: true,
    })

    try {
      await pour('user', this)
    } catch (e) {
      console.error(e)
    }
  }

  @action setUser = (user: User) => {
    this.user = user
    userModel.logIn(user)
  }

  @computed get token() {
    return userModel?.jwt || this?.user?.jwt
  }

  @computed get jwtParsed() {
    return parseJwt(this.token) || userModel?.parsedToken
  }

  @computed get freeAccount() {
    return SUPER_MODE === 'true' ? false : this.jwtParsed?.audience === 0
  }

  @computed get getID() {
    return Number(this?.user?.id || this?.jwtParsed?.keyid)
  }

  @computed get firstDay() {
    return isSameDay(this.jwtParsed.iat, Date.now())
  }

  @computed get loggedIn() {
    return userModel.loggedIn || this.token
  }

  @action clearUser = () => {
    userModel.logOut()
    this.user = USER_DEFAULTS
    window.location.href = '/'
  }

  @action setJwt = (jwt: string) => {
    if (this.user) {
      this.user.jwt = jwt
    }
    userModel.setJwt(jwt)
  }
}

const manager = new UserManager()

export { manager as UserManager }
