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
  })
})
