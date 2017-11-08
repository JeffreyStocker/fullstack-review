import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this)
    this.onChange = this.onChange.bind(this)
    // this.onKeyPress = this.onChange.bind(this)
  }


  onChange (e) {
    if(e.charCode==13){
      this.props.onSearch(this.state.term);
    } else {
      this.setState({
        term: e.target.value
      });
      // console.log (this.state.term)
    }
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange} onKeyPress={this.onChange}/>       
      <button onClick={this.search}> Add Repos </button>
    </div>) 
  }
}

export default Search;


