import { Seeder } from '..'

interface QuemSou {
  constent: string
  img: {
    src: string
    alt: string
  }
}

const seedQuemsou = new Seeder<QuemSou>({
  nameDbCollection: 'quem_sou',
  path: 'quemsou',
})

export const quemsou = seedQuemsou.route
