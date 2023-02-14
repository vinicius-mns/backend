import { describe, expect, it } from 'vitest'
import { Helper } from './Helper' 

describe('Helper', () => {

  describe('.isObject', () => {

    it('Passar "object" como props nao retorna erro', () => {

      const h = new Helper()
  
      h.object({name: null}).isObject()
      h.object({coisa: 'nada'}).isObject()
      h.object({}).isObject()
  
      expect(h.Errors).toEqual([])
    })

    it('Nao passar "object" como props retorna erro', () => {
  
      const h = new Helper()
  
      h.object(2).isObject()
      h.object('vinicius').isObject()
      h.object(null).isObject()
  
      expect(h.Errors).length(3)
  
      expect(h.Errors[0]).toEqual({ObjectError:'2 deve ser do tipo "object"'})
      expect(h.Errors[1]).toEqual({ObjectError:'vinicius deve ser do tipo "object"'})
      expect(h.Errors[2]).toEqual({ObjectError:'null deve ser do tipo "object"'})
    })
  })
  
  describe('.notHasEmptyValues', () => {

    it('Nao retorna erro ao passar {key : value}', () => {
      const h = new Helper()

      h.object({name: 'vinicius'}).notHasEmptyValues()
      h.object({email: 'vinicius'}).notHasEmptyValues()
      h.object({age: 123}).notHasEmptyValues()

      expect(h.Errors).toEqual([])
    })
    
    it('Retorna erro ao nao passar {key : value}', () => {
      const h = new Helper()

      h.object({name: null}).notHasEmptyValues()
      h.object({email: ''}).notHasEmptyValues()
      h.object({age: 0}).notHasEmptyValues()

      expect(h.Errors).length(3)
      expect(h.Errors[0]).toEqual({ValueError: 'name nao pode receber valor Nulo ou Vazio'})
    })

  })

  describe('.haveKey', () => {
    it('Nao retorna erro caso tenha a chave', () => {
      const h = new Helper()

      h.object({name: 'vinicius'}).haveKey('name')

      expect(h.Errors).toEqual([])
    })
  })
})
