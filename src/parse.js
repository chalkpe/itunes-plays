import fs from 'fs'
import plist from 'plist'

export default file =>
  Object.values(plist.parse(fs.readFileSync(file, 'utf8')).Tracks)
