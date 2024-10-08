import type { Geolocation } from './geolocation'

export interface Form {
  form: {
    step1: FormStep1
    step2: FormStep2
    step3: FormStep3
  }
}
export interface FormStep1 {
  firstName: string
  lastName: string
  dateOfBirth: string | null
  province: string
  email: string
  phoneNumber: string
  city: string
  postalCode: string
  address: string
  emailAsETransfer: boolean | null
  emailETransfer: string | null
  termsAndConditions: boolean | null
}
export interface FormStep2 {
  requested_amount: string
}
export interface FormStep3 {
  incomeType: string
  nextPayDate: string | null
  paymentFrequency: string | null
  employer: string | null
  workPhone: string | null
  timeAtJob: string | null
}
export interface FormStep3DTO {
  step: FormStep3
}
export interface FormStep2DTO {
  step: FormStep2
}
export interface Step1DTO {
  step: FormStep1
  geolocation: Geolocation
  ip: string
  source: string
}
export interface CircularOptions {
  label: string
  value: string
}