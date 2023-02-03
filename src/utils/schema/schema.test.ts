import { describe, expect, it } from 'vitest'
import { Schema as s } from '.'

describe('Schema', () => {
  it('string', () => {
    const user = s.object({
      name: s.string(),
      pass: s.object({name: s.string})
    })

    const x = user.compare({
      name: '3',
      pass: 'r',
    })

    expect(x).toBe(undefined)
  })
})