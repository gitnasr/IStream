import { useCallback, useState } from "react"

const isValidUrl = (urlString: string) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ) // validate fragment locator
  return !!urlPattern.test(urlString)
}
export const useAutoParse = () => {
  const [currentValue, setCurrentValue] = useState("")

  const v = useCallback(async () => {
    const text = await navigator.clipboard.readText()
    if (!text || text === currentValue || !isValidUrl(text)) return
    setCurrentValue(text)
  }, [])

  return {
    value: currentValue,
    getValue: v,
    update: setCurrentValue,
  }
}
export default useAutoParse
