import { Seeder } from '..'

interface OQuesei {
  constent: string
  img: {
    src: string
    alt: string
  }
}

const seedOQuesei = new Seeder<OQuesei>({
  nameDbCollection: 'o_que_sei',
  path: 'oquesei',
})

export const oquesei = seedOQuesei.route
