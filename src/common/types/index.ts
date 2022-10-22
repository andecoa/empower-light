export type DeviceConfig = {
  _id: string
  version: string
  date: string
  led_freq_sec: number
  data_log_freq_min: number
  data_upload_freq_min: number
  data_download_freq_min: number
  e2t_url: string
  l: string
  n: string
}

export type Device = {
  _id: string
  l: string
  n: string
}

export type Energy = {
  _id: string
  ts: string
  ein: number
  eout: number
}

export type TelemetryConfig = {
  _id: string
  data: [{ [key: string]: any }]
}

export type APIError = {
  message: string
}
