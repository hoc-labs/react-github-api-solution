// https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './GitHubAPI.css';
import Button from 'react-bootstrap/Button';


async function getGitHubReposForUserName(username) {
  const result = await (axios.get(`https://api.github.com/users/${username}/repos`));
  return result.data;
}

function RepoList({repos}) {
  if (!repos) return <><p>No repositories</p></>;

  return (
    <>
    <ul>
      <h2>Available Public Repositories</h2>
      {repos.map((repo) => {
        return (
          <li key={repo.id}>
            <span>{repo.name} </span>
            <span>{repo.description}</span>
          </li>
        );
      })}
    </ul>
    </>
  )
}

function GitHubAPI() {
  const [loaded, updateLoaded] = useState(false);
  const [repos, updateRepos] = useState([]);
  const [username, updateUserName] = useState('');

  useEffect(() => {
    updateLoaded(false);

    (async ()=> {
      const repos = await getGitHubReposForUserName(username);
      updateRepos(repos);
      updateLoaded(true);
    })();

  }, [username]);

  return (
    <> 
      <input id="username" type="text"></input>
      <Button variant="primary" size="sm" onClick={
        ()=>updateUserName(document.getElementById('username').value)
        }>Submit</Button>

      <h1>{loaded?`${username}: Repositories`:''}</h1>
      <div>
        {loaded?<RepoList repos={repos}/>:username?<p>Loading...</p>:'Enter username'}
      </div>
    </>
  );
}

export default GitHubAPI;