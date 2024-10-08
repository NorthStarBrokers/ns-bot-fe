import type { Form } from '../interfaces/form-model'

export const appHubUrlParams = (
  form: Form,
  companyId: string,
  leadId: string,
  lang: string
): string => {
  const { step1, step2, step3 } = form.form

  const params: Record<string, string> = {
    company_id: companyId,
    lead_id: leadId,
    lang: lang,
    email: step1.email,
    first_name: step1.firstName,
    last_name: step1.lastName,
    dob: step1.dateOfBirth!,
    province: step1.province,
    city: step1.city,
    postal_code: step1.postalCode,
    address: step1.address,
    amount: step2.requested_amount,
    income_type: mapIncomeType(step3.incomeType),
    next_pay_date: step3.nextPayDate ?? '',
    employer: step3.employer ?? '',
    work_phone: step3.workPhone ?? '',
    often_get_paid: step3.paymentFrequency ? mapPaymentFrequency(step3.paymentFrequency) : ''
  }

  const urlParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      urlParams.append(key, value)
    }
  })

  return urlParams.toString()
}

export const mapIncomeType = (incomeType: string): string => {
  const mappings: { [key: string]: string } = {
    'Full time': 'full_time',
    'Part time': 'part_time',
    'Self employed': 'self_employed',
    Retired: 'retired',
    Disability: 'disability',
    'Social security': 'social_security',
    Unemployed: 'unemployed'
  }
  return mappings[incomeType] || ''
}

export const mapPaymentFrequency = (frequency: string): string => {
  const mappings: { [key: string]: string } = {
    Weekly: 'WEEKLY',
    'Bi-weekly (Every 14 days)': 'BIWEEKLY',
    'Bi-monthly (Twice a month)': 'TWICEMONTHLY',
    Monthly: 'MONTHLY'
  }
  return mappings[frequency] || ''
}
