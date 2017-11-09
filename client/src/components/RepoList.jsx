import React from 'react';
import RepoView from './repoView.jsx';

const RepoList = (props) => (
  <div>
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
    </div>
    {
      props.repos.map((repo, index) => {
        if (index < 25) {
          return <RepoView repo={repo} key={repo.id} />
        }
      })
    }
  </div>
)

export default RepoList;