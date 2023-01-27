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

  it('Retorna erro ao passar propriedade diferente da definida no schema', () => {
    const userWithPass = p.object({name: p.string(), pass: p.string()}) // pass do tipo string
    const nada = userWithPass.safaParser({ name: 'vinicius', pass: 2 }) // pass sendo number

    expect(nada).toBe('A chave: "pass" esperava "string" mas recebeu: "number"')
  })

  it('Nao retorna erro ao passar propriedades corretamente',() => {
    const userWithPass = p.object({name: p.string(), pass: p.string()})
    const content = userWithPass.safaParser({ name: 'vinicius', pass: 'senha' })
    
    const product = p.object({name: p.string(), quantity: p.number()})
    const content2 = product.safaParser({name: 'bana', quantity: 2})

    expect(content).toBe(undefined)
    expect(content2).toBe(undefined)
  })
})
