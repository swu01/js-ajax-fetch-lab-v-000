let fork_owner = ''
const owner = 'learn-co-curriculum'
const repo = 'javascript-fetch-lab'

function getIssues() {
  fetch(`https://api.github.com/repos/${fork_owner}/${repo}/issues`)
  .then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {
  const issueList = json.map(issue => {
    return `<li>
      Title: ${issue.title}<br>
      Body: ${issue.body}
    </li><br>`
  }).join('')
  const result = `<h3>Your issues:</h3><ul>${issueList}</ul>`
  $('#issues').html(result);
}

function createIssue() {
  const title = document.getElementById('title').value
  const body = document.getElementById('body').value
  const postData = {title: title, body: body}
  fetch(`https://api.github.com/repos/${fork_owner}/${repo}/issues`, {
    method: 'post',
    body: JSON.stringify(postData),
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json())
  .then(json => getIssues(json))
}

function showResults(json) {
  const result = `<p>Repository URL:<a href="${json.html_url}"> ${json.html_url}</a></p>`
  $('#results').html(result);
  fork_owner = `${json.owner.login}`
}

function forkRepo() {
  fetch(`https://api.github.com/repos/${owner}/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `token ${getToken()}`
    }
  }).then(res => res.json())
  .then(json => showResults(json))
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
