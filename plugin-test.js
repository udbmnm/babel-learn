import {transformFileSync} from '@babel/core'
import addConsoleDetail from './plugins/add-console-detail.js'
import { fileURLToPath } from 'url'
import path,{ dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const newCode = transformFileSync(path.join(__dirname,'./source/console.js'),{
    plugins:[addConsoleDetail],
    parserOpts: {
      sourceType: 'script',
      plugins: []
    }
})

console.log('newCode',newCode)