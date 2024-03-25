import { Actions } from "types"
import Cookies from "./Cookies"
import axios from "axios"

class Backend extends Cookies {
  public token: string | undefined = undefined
  public device: string | undefined = undefined
  constructor() {
    super()
    this.token = this.getByName("token") || ""
    this.device = this.getByName("device") || ""
  }
  private mainUrl = process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "https://api.example.com"
  async get(url: string) {
    const res = await axios.get(`${this.mainUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    return res.data
  }
  async post(url: string, data: any, secure: boolean = false) {
    const res = await axios.post(`${this.mainUrl}${url}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: secure ? `Bearer ${this.token}` : "",
      },
    })
    return res.data
  }
  async put(url: string) {
    const res = await axios.put(`${this.mainUrl}${url}`, {}, { headers: { Authorization: `Bearer ${this.token}` } })
    return res.data
  }

  async authenticate() {
    const res = await this.get(`/auth/me`)
    return res
  }
  async Track(action: Actions, operationId: string) {
    return this.put(`/engine/track/${action}?id=${operationId}`)
  }
}

export default Backend
