import parse from './parse'
import { watch } from 'chokidar'

import Table from 'ink-table'
import { h, render, Component, Color } from 'ink'

class Graph extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tracks: [],
      watcher: null
    }
  }

  render () {
    const P = 'Play Count'
    const data = this.state.tracks
      .sort((a, b) => (b[P] || 0) - (a[P] || 0))
      .slice(0, 25)
      .map(
        ({ Name, Artist, Album, [P]: Count }, i) =>
        ({ Rank: i + 1, Count, Name, Artist, Album }))

    return (<Table data={data} />)
  }

  componentDidMount () {
    this.track()
    this.setState({
      watcher: watch(this.props.file).on('change', () => this.track())
    })
  }

  componentWillUnmount () {
    this.state.watcher.close()
    this.setState({ watcher: null })
  }

  track () {
    this.setState({ tracks: parse(this.props.file) })
  }
}

export default file => render(<Graph file={file} />)
