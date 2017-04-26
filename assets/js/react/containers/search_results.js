import React, {Component} from 'react'

class SearchResults extends Component {
  render(){
    return (
      <div>
        Users here...eventually.
      </div>
    )
  }
}

function mapStateToProps(state){
  return {users:state.users}
}

export default SearchResults
