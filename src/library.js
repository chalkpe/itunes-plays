import plist from 'plist'

class Library {
  constructor (data) {
    this.library = plist.parse(data)
  }
}
