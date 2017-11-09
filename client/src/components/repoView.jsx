import React from 'react';

const RepoView = (props) => {
  function onClickTitle (event) {
    event.preventDefault();
    window.location = props.repo.html_url
  }

  return (
    <div className="repo-view">

      <div className='title' onClick={onClickTitle}> {props.repo.name} </div>
      { props.repo.fork &&
        <div>
          Forked From {props.repo.fork_url}
        </div>
      }
      <div>
        <description> {props.repo.description} </description>
      </div>
    </div>
  )
}

export default RepoView;

/* {console.log(this.props)} */
//
// {/* <h1 className='title' onClick={> {props.repo.name} </h1> */}
//
//      {console.log(props.repo)}
//
//
//
