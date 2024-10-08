export interface JerryAddLead {
    language: string
    source: string
    source_customerid: number
    source_companyid: number
    firstname: string
    lastname: string
    email: string
    phone: string
    dob: string | null
    emp_incometype: string
    emp_name: string | null
    emp_phone: string | null
    emp_date: string | null
    loanamount: number
    email_sms_notification: number
    process_lead: boolean
  }
  
  export interface JerryUpdateLead {
    leadid: number
    tag: string
    loginid: string
    accountid: string
    language: string
    source: string
  }