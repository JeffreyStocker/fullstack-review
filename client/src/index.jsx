import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  var search = this.search.bind(this);
 }

  search (term) {
    console.log(`${term} was searched`);
    var url = 'http://localhost:1128/repos';
      $.post(url, term, function (data, textStatus, jqXHR) {
        console.log ('sendRequestToServer Success data:', data, '||', textStatus).type('form')
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


// import React from 'react';
// import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import Search from './components/Search.jsx';
// import RepoList from './components/RepoList.jsx';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       repos: []
//     }
    
//     var sendRequestToServer = function (searchData) {
//       url = 'localhost:1128';
//       // $.ajax({
//       //   url: 'localhost:1128',
//       //   method: 'get',
//       //   // data: somehting // will be converted to a query string
//       //   error: function (jqXHR, textStatus, error) {
//       //     console.log (jqXHR, textStatus, error)
//       //   },
//       //   success: function (data, textStatus, jqXHR) {
//       //     console.log ('data', data)
//       //     console.log ('textStatus', textStatus)
//       //   }
//       // })
//       $.post(url, searchData, function (data, textStatus, jqXHR) {
//         console.log ('sendRequestToServer Success data:', data, '||', textStatus)
//       })
  
//     }
//   }


//   onSearch (term) {
//     console.log(`${term} was searched`);
//     $.post('http://localhost:1128/repos', term, function (data, textStatus, jqXHR) {
//       console.log ('sendRequestToServer Success data:', data, '||', textStatus)
//     })
//   }

//   render () {
//     return (<div>
//       <h1>Github Fetcher</h1>
//       <RepoList repos={this.state.repos}/>
//       <Search onSearch={this.onSearch}/>
//     </div>)
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));