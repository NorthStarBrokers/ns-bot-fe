import type { BrandModel } from '../core/interfaces/brand-model'
import type { Form } from '../core/interfaces/form-model'
import type { JerryAddLead, JerryUpdateLead } from '../core/interfaces/jerry-model'
import type { Lang } from '../core/interfaces/lang-model'
import { axiosPost } from './axios-methods'
import { host, Environment } from '../core/config/environment/host'
import { generateRandomNumberByDigits } from '../core/helper/math-functions'

const baseEndpoint = 'jerry'

export const jerryAPI = async (
  method: 'add' | 'update',
  applicationId: string,
  bodyPost?: JerryAddLead,
  bodyPut?: JerryUpdateLead
) => {
  const currentEnvironment = host.environment
  const environmentEndpoint =
    currentEnvironment === Environment.local || currentEnvironment === Environment.development
      ? 'dev'
      : 'prod'
  const body = {
    data: method == 'add' ? bodyPost : bodyPut,
    environment: environmentEndpoint
  }
  return await axiosPost(
    body,
    `/${baseEndpoint}/${method == 'add' ? 'add-lead' : 'update-lead'}/${applicationId}`
  )
}

export const mapFormToBody = (
  formBody: Form,
  lang: Lang,
  source: BrandModel,
  funding: boolean
): JerryAddLead => {
  const { form } = formBody
  const { step1, step2, step3 } = form

  return {
    language: lang,
    source: source.flinks,
    source_customerid: generateRandomNumberByDigits(6),
    source_companyid: source.companyId,
    firstname: step1.firstName,
    lastname: step1.lastName,
    email: step1.email,
    phone: step1.phoneNumber,
    dob: step1.dateOfBirth,
    emp_incometype: mapIncomeType(step3.incomeType),
    emp_name: step3.employer,
    emp_phone: step3.workPhone,
    emp_date: step3.timeAtJob,
    loanamount: Number(step2.requested_amount),
    email_sms_notification: 1,
    process_lead: funding
  }
}

const mapIncomeType = (incomeType: string): string => {
  const mappings: { [key: string]: string } = {
    'Full time': 'Employed',
    'Part time': 'Employed',
    'Self employed': 'Self Employed',
    Retired: 'Employed',
    Disability: 'On unemployment / CSST / Medical leave',
    'Social security': 'Employed',
    Unemployed: 'On unemployment / CSST / Medical leave'
  }

  return mappings[incomeType] || ''
}