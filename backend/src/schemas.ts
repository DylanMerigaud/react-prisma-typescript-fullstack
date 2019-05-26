import { enumType, objectType } from 'nexus'

export const Aliment = enumType({
  name: 'Aliment',
  members: ['Poulet', 'Frites', 'Error'],
  description: 'A boufer !',
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition: (t) => {
    t.string('token')
    t.field('user', {
      type: 'User',
    })
  },
})
