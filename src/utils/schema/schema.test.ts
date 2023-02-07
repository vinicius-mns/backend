import { describe, expect, it } from 'vitest'
import { Schema as s } from '.'

describe('Schema', () => {
  it('Cria um obj simples com string', () => {
    const user = s.object({
      name: s.string()
    })

    const verify = user.compare({
      name: 'vinicius'
    })

    expect(verify).toBe(undefined)
  })

  it('Retorna erro ao passar propriedade simples diferente do Schema', () => {
    const user = s.object({
      name: s.string()
    })

    const verify = user.compare({
      name: 2
    })

    expect(verify).toBe('A key: "name" esperava o tipo "STRING" mas recebeu: number')
  })

  it('E possivel adicionar objeto dentro de objeto', () => {
    const user = s.object({
      name: s.string(),
      contact: s.object({
        email: s.string(),
        phone: s.number(),
      })
    })

    const verify = user.compare({
      name: 'vinicius',
      contact: {
        email: 'vininicius',
        phone: 1234
      }
    })

    expect(verify).toBe(undefined)
  })

  it('Retona erro ao passar obj vazio', () => {
    const user = s.object({
      name: s.string(),
      contact: s.object({
        email: s.string(),
        phone: s.number(),
      })
    })

    const verify = user.compare({
      name: 'vinicius',
      contact: {
      }
    })

    expect(verify).toBe('Compare - Não pode ser um objeto vazio')
  })
})