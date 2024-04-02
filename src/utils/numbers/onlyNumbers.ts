export function onlyNumbers(data: string | unknown) {
    return String(data)?.replace(/[^0-9]/g, '') || ""
}
  