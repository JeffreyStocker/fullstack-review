import React from 'react';

const RepoView = (props) => {
  function onClickTitle (event) {
    event.preventDefault();
    window.location = props.repo.html_url
  }

  return (
    <div className="repo-view">
      
      <div className='title' onClick={onClickTitle}> {props.repo.name} </div>
      <test> Forked From </test>
      <description> {props.repo.description} </description>
    </div>
  )
}

export default RepoView;

/* {console.log(this.props)} */
//
// {/* <h1 className='title' onClick={> {props.repo.name} </h1> */}
//
//
//{console.log(props.repo)}
//
//
