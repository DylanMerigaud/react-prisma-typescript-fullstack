import * as yup from 'yup'

export const AlimentYupSchema = yup.mixed().oneOf(['Poulet', 'Frites'])

export const EmailYupSchema = null

export const PasswordYupSchema = null
