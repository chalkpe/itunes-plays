import fs from 'fs'
import plist from 'plist'

const P = 'Play Count'
export default file =>
  Object.values(plist.parse(fs.readFileSync(file, 'utf8')).Tracks)
    .sort((a, b) => (b[P] || 0) - (a[P] || 0))
    .slice(0, 25)
    .map(({ Name, Artist, Album, [P]: Count }, i) =>
      ({ Rank: i + 1, Count, Name, Artist, Album }))
