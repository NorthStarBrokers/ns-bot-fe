export const redirectWithParams = (baseUrl: string, params: string) => {
  if (!isValidUrl(baseUrl)) {
    throw new Error('URL base no válida')
  }

  const url = new URL(baseUrl)
  url.search = params
  window.location.href = url.toString()
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}
