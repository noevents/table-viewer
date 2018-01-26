import React, { Component } from 'react'

class TableHeader extends Component {
  render() {
    const cellElements = this.props.headers.map((cellData, i) =>{
      let arrow = ''
      if (i === +this.props.activeHeader){
        arrow = (this.props.order) ? '▲' : '▼'
      }
      return <div className='th' style={{width: this.props.cellWidths[i]}} key={i} onClick={(e) => this.props.sortHandler(i)} >{cellData}{arrow}</div>
      
    })
    return (
      <div className='thead-dark position-fixed'>
        <div className="tr" >
          {cellElements}
        </div>
      </div>
    )
  }
}

export default TableHeader
