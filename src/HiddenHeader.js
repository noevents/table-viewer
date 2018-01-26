import React, { Component } from 'react'

class HiddenHeader extends Component{
  constructor(props){
    super(props)
    this.cellWidths = []
  }
  addWidth(el){
    if (!el) return
    this.cellWidths.push(el.offsetWidth)
    if(this.cellWidths.length === this.props.headers.length) this.props.widthsHandler(this.cellWidths)
  }
  render(){
    const cellElements = this.props.headers.map((cellData, i) =>{
      return <th ref={(el) => this.addWidth(el)} key={i} >{cellData}</th>
    })
    // console.log('load')
    return (
      
      <thead>
        <tr>
          {cellElements}
        </tr>
      </thead>
    )
  }
}

export default HiddenHeader