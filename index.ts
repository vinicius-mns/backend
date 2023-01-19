import { MyExpress } from './src/constumer/express'
import { quemsou } from './src/Core/Quemsou'

const myExpress = new MyExpress()

myExpress.useRoute([
  quemsou.routers
])