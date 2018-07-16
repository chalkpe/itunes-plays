import Table from 'ink-table'
import { h, render, Component, Color } from 'ink'

import Library from './library'
import { rank, played, peek } from './util'

const table = lib => lib.mostPlayedTracks
  .slice(0, 25)
  .map(rank('playCount'))
  .map(played('playDateUtc'))
  .map(peek('rank', 'playCount:count', 'name', 'artist', 'album', 'played'))

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = { library: null }
  }

  render () {
    const { library: lib } = this.state
    return lib ? (<Table data={table(lib)} />) : (<Color green>Loading</Color>)
  }

  componentDidMount () {
    this.setState({ library: new Library(this.props.file) })
  }

  componentWillUnmount () {
    if (this.state.library) this.state.library.close()
  }
}

export default file => render(<Graph file={file} />)
