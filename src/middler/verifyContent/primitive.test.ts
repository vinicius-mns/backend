import { describe, expect, it } from 'vitest'
import { Primitive as p } from '.'

describe('Testando Classe Primitive', () => {
  
  it('Retorna erro ao nao passar "Chave" definada',() => {
    const userWithPass = p.object({name: p.string(), pass: p.string()}) // pass definido
    const content = userWithPass.safaParser({ name: 'vinicius' }) // pass faltando

    expect(content).toBe('Está faltando a chave "pass"')
  })

  it('Retorna erro ao passa "Chave" a mais',() => {
    const userWithPass = p.object({name: p.string(), pass: p.string()}) // adm nao definido
    const content = userWithPass.safaParser({ name: 'vinicius', pass: 'senha', adm: true }) // adm adicionado

    expect(content).toBe('A chave: "adm" nao existe')
  })
})
