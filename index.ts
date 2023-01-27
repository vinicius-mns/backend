import { MyExpress } from './src/constumer/express'
import { oquesei } from './src/core/Oquesei'
import { quemsou } from './src/core/Quemsou'

const myExpress = new MyExpress()

myExpress.useRoute([
  quemsou.routers,
  oquesei.routers,
])