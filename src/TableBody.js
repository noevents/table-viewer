import React, { Component } from 'react'
import TableRow from './TableRow'

class TableHeader extends Component {
  shouldComponentUpdate(nextProps, nextState){
    return this.props.gettingSize && nextProps.gettingSize
  }
  render() {
    const rows = this.props.data.map((row, i)=>{
      return <TableRow key={i} cells={row} />
    })
    return (
      <tbody>
        {rows}
      </tbody>
    )
  }
}

export default TableHeader