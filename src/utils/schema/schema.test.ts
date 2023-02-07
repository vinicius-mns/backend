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
})