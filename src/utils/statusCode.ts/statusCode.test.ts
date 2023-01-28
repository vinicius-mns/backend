import { describe, expect, it } from 'vitest'
import { StatusCode as status } from '.'

describe('Tatando utils [StatusCode]', () => {
  it('Retona um obj com status "201"', () => {
    const create = status.create<{name: string}>(201, {name: 'fulano'})

    expect(create.statusCode).toBe(201)
    expect(create.content).toEqual({name: 'fulano'})
  })
})