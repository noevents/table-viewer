import React, { Component } from 'react'
import papa from 'papaparse'
import './App.css'
import TableHeader from './TableHeader'
import HiddenHeader from './HiddenHeader'
import TableBody from './TableBody'

class App extends Component {
  constructor(props){
    super(props)
    this.straightOrder = true // true - 'straight', false - reverse
    this.sortColumn = 0
    this.headerCellWidths = []
    this.state = {
      header: [],
      cache: [],
      rowWithTypes: [],
      renderFixedHeader: false
    }
  }
  reverseSort (type, col) {
    if(type === 'number'){
      return (a, b)=>{
        return b[col] - a[col]
      }
    } else {
      return (a, b)=>{
        if (a[col] < b[col]) return 1
        if (a[col] > b[col]) return -1
      }
    }
  }

  compareFunction = (type, col, straightOrder) => {

    if (!straightOrder) return this.reverseSort(type, col)
    if(type === 'number'){
      return (a, b)=>{
        return a[col] - b[col]
      }
    } else {
      return (a, b)=>{
        if (a[col] > b[col]) return 1
        if (a[col] < b[col]) return -1
      }
    }
  }

  sortByColumn = (col, table) => {
    let type = isNaN(this.state.rowWithTypes[col]) ? 'string' : 'number'

    if(!table){
      if (this.sortColumn === col){
        this.straightOrder = !this.straightOrder
        console.log('flip')
      } else {
        this.sortColumn = col
      }
      localStorage.setItem('straightOrder', (this.straightOrder) ? true : '')
      localStorage.setItem('sortColumn', this.sortColumn)
      this.setState({
        cache: this.state.cache.sort(this.compareFunction(type, col, this.straightOrder))
      })
      return
    }
    
    return table.sort(this.compareFunction(type, col, this.straightOrder))
  }

  widthsHandler = (arr) => {
    this.headerCellWidths = arr
    this.setState({
      renderFixedHeader: true
    })
  }

  componentDidMount = () => {

    papa.parse('https://simplestatic.herokuapp.com/titanic.csv', {
      download: true,
      complete: (results) => {
        let sortedTable = results.data.slice(1, results.data.length-1)
        let found = false
        let k = 0
        let rowLen = results.data[0].length
        while(!found){
          k++
          for(let m = 0; m < rowLen; m++){
            if(results.data[k][m] === ''){
              found = false
              break
            }
            found = results.data[k]
          }
          
        }
        this.setState({
          rowWithTypes: found
        }, () => {
          if(localStorage.getItem('sortColumn')){
            this.straightOrder = !!localStorage.getItem('straightOrder')
            this.sortColumn = +localStorage.getItem('sortColumn')
            sortedTable = this.sortByColumn(this.sortColumn, sortedTable)
          }
          this.setState({
            header: results.data[0],
            cache: sortedTable
          })
        })
      }
    })
  }

  render() {
    
    let tHead = ''
    if (this.state.renderFixedHeader) {
      tHead = <TableHeader
                cellWidths={this.headerCellWidths}
                headers={this.state.header}
                sortHandler={this.sortByColumn}
                activeHeader={this.sortColumn}
                order={this.straightOrder}
              />
    }
    let tBody = <tbody><tr><td>Loading</td></tr></tbody>
    if (this.state.cache.length > 0){
      tBody = <TableBody data={this.state.cache} gettingSize={this.state.renderFixedHeader} />
    }
    return (
      <div className='table-responsive' >
        {tHead}
        <table className="table">
          <HiddenHeader headers={this.state.header} widthsHandler={this.widthsHandler}/>
          {tBody}
        </table>
      </div>
      
    )
  }
}

export default App
