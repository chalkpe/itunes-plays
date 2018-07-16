import moment from 'moment'
import Library from './library'
import { peek, rank } from './util'

import Table from 'ink-table'
import { h, render, Component, Color } from 'ink'

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = { library: null }
  }

  render () {
    const { library } = this.state
    if (!library) return (<Color grey>Loading...</Color>)

    const data = library.mostPlayedTracks
      .slice(0, 25)
      .filter(o => o.playCount)
      .map(o => ({ ...o, l: moment(o.playDateUtc || 0).fromNow() }))
      .map(peek('playCount:count', 'name', 'artist', 'album', 'l:last played'))
      .map(rank('Count'))

    return (<Table data={data} />)
  }

  componentDidMount () {
    this.setState({ library: new Library(this.props.file) })
  }

  componentWillUnmount () {
    if (this.state.library) this.state.library.close()
  }
}

export default file => render(<Graph file={file} />)
