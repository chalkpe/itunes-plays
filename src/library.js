import fs from 'fs'
import plist from 'plist'
import chokidar from 'chokidar'
import camelcase from 'camelcase-keys'

class Library {
  constructor (path) {
    this.path = path
    this.watcher = chokidar.watch(this.path).on('change', () => this.fetch())

    this.fetch()
  }

  fetch () {
    if (!this.path.endsWith('.xml')) throw new Error('XML file is needed')

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
    return this.tracks
      .filter(o => o.playCount && o.playDate)
      .sort((a, b) => (b.playCount - a.playCount) || (b.playDate - a.playDate))
  }

  findTracksByArtistName (artist, exact = false) {
    return this.tracks.filter(({ artist: a }) =>
      exact ? a === artist : a.toLowerCase().includes(artist.toLowerCase()))
  }
}

export default Library
