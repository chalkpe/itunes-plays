import fs from 'fs'
import plist from 'plist'
import chokidar from 'chokidar'
import camelcase from 'camelcase-keys'

class Library {
  constructor (path) {
    this.path = path
    if (!path.endsWith('.xml')) throw new Error('XML file is needed')

    this.fetch()
    this.watcher = chokidar.watch(this.path).on('change', () => this.fetch())
  }

  fetch () {
    const file = fs.readFileSync(this.path, 'utf8')
    const library = camelcase(plist.parse(file), { deep: true })

    this.date = library.date
    this.tracks = Object.values(library.tracks)
  }

  close () {
    this.watcher.close()
    this.watcher = this.tracks = null
  }

  get mostPlayedTracks () {
    const [x, y] = ['playCount', 'playDate']

    return this.tracks
      .filter(o => o[x] && o[y])
      .sort((a, b) => (b[x] - a[x]) || (b[y] - a[y]))
  }

  findTracksByArtistName (artist, exact = false) {
    return this.tracks.filter(({ artist: a }) =>
      exact ? a === artist : a.toLowerCase().includes(artist.toLowerCase()))
  }
}

export default Library
