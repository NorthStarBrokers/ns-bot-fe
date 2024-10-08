import type { CircularOptions } from "../interfaces/form-model"

export const FormProvince: Record<string, string> = {
  '': 'form.step2.province.options.default',
  'BC - British Columbia': 'form.step2.province.options.bc-british-columbia',
  'ON - Ontario': 'form.step2.province.options.on-ontario',
  'NL - Newfoundland and Labrador': 'form.step2.province.options.nl-newfoundland-and-labrador',
  'NS - Nova Scotia': 'form.step2.province.options.ns-nova-scotia',
  'PE - Prince Edward Island': 'form.step2.province.options.pe-prince-edward-island',
  'NB - New Brunswick': 'form.step2.province.options.nb-new-brunswick',
  'QC - Quebec': 'form.step2.province.options.qc-quebec',
  'MB - Manitoba': 'form.step2.province.options.mb-manitoba',
  'SK - Saskatchewan': 'form.step2.province.options.sk-saskatchewan',
  'AB - Alberta': 'form.step2.province.options.ab-alberta',
  'NT - The Northwest Territories': 'form.step2.province.options.nt-the-northwest-territories',
  'NU - Nunavut': 'form.step2.province.options.nu-nunavut',
  'YT - The Yukon': 'form.step2.province.options.yt-the-yukon'
}


export const FormProvidenceCreditSense = 'BC - British Columbia'


export const FormTimeLivingInHouse: Record<string, string> = {
  '': 'form.step1.living-house-time.default',
  '0 - 6 Months': 'form.step1.living-house-time.0-6',
  '6 - 12 Months': 'form.step1.living-house-time.6-12',
  '12+ Months': 'form.step1.living-house-time.+12',
}

export const loanAmount = [
  '300',
  '500',
  '700',
  '1000',
  '1500',
  '2000',
  '2500',
  '3000'
]


export const EmploymentSituation: Record<string, string> = {
  '': 'form.step3.income-type.options.default',
  "Full time": 'form.step3.income-type.options.full-time',
  "Part time": 'form.step3.income-type.options.part-time',
  "Self employed": 'form.step3.income-type.options.self-employed',
  "Retired": 'form.step3.income-type.options.retired',
  /* "Disability": 'form.step3.income-type.options.Disability', */
  "Social security": 'form.step3.income-type.options.social-security',
  "Unemployed": 'form.step3.income-type.options.unemployed'
}

export const PaymentFrequency: CircularOptions[] = [
  { value: 'Weekly', label: 'form.step3.payment-frequency.options.weekly' },
  { value: 'Bi-weekly (Every 14 days)', label: 'form.step3.payment-frequency.options.bi-weekly' },
  { value: 'Bi-monthly (Twice a month)', label: 'form.step3.payment-frequency.options.bi-monthly' },
  { value: 'Monthly', label: 'form.step3.payment-frequency.options.monthly' }
]
