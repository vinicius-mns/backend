import { MyExpress } from './src/constumer/express'
import { oquesei } from './src/Core/Oquesei'
import { quemsou } from './src/Core/Quemsou'

const myExpress = new MyExpress()

myExpress.useRoute([
  quemsou.routers,
  oquesei.routers,
])