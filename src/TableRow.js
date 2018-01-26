import React from 'react'

function TableRow(props) {
  let cellElements = props.cells.map((cellData, i) =>{
    return <td key={i}>{cellData}</td>
  })
  
  return (
    <tr>
      {cellElements}
    </tr>
  )
}

export default TableRow