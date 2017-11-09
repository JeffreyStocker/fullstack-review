import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      sort: 'first'
    }
  var search = this.search.bind(this);
  var currentThis = this;
  // this.trySetstate = this.trySetstate.bind(this)
  // console.log ('testThis ', this)
  // this.trySetstate()
  this.getReposFromServer()
}

  getReposFromServer () {
    var storedthis = this;
    $.get('http://localhost:1128/repos','', function (data, textStatus) {
      // console.log ('received data', data)
      storedthis.setState({ repos: data })
    } )
  }

  search (term) {
    var tempThis = this
    // console.log(`${term} was searched`);
    var url = 'http://localhost:1128/repos';
      $.post(url, term, function (data, textStatus) {
        // console.log ('sendRequestToServer Success data:', data, '||', textStatus)
        if (textStatus === 'success') {
          // console.log (this.state)
          tempThis.setState({
            repos : data
          })
        }
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));