import { getCookie, setCookie } from "cookies-next"

import moment from "moment"

class Cookies {
  getByName(key: string) {
    return getCookie(key)?.toString()
  }
  setByName(key: string, value: string) {
    return setCookie(key, value, { expires: moment().add(7, "days").toDate() })
  }
}

export default Cookies
