class Poll {

  static travis (repo, branch) {

    var query = '?limit=1'.concat(branch ? `&branch.name=${branch}` : '');

    fetch('https://api.travis-ci.com/repo/'.concat(encodeURIComponent(repo.$slug), '/builds', query), {
      headers: { 'Travis-API-Version': '3' }
    }).then(function (response) {

      if (response.ok) {
        return response.json();
      }

      // TODO
      // standardise error handling

    }).then(function (data) {
      return Transformer.travis(data.builds.pop());
    }).then(this.$callback.bind(this, repo, branch));

  }

  static github (repo, branch) {

    var query = '?per_page=1'.concat(branch ? `&branch=${branch}` : '');

    fetch(`https://api.github.com/repos/${repo.$slug}/actions/runs`.concat(query), {
      headers: undefined
    }).then(function (response) {

      if (response.ok) {
        return response.json();
      }

      // TODO
      // standardise error handling

    }).then(function (data) {
      return Transformer.github(data.workflow_runs.pop());
    }).then(this.$callback.bind(this, repo, branch));

  }

  static $callback (repo, branch, data) {
    Object.assign(repo[branch || '$latest'], data);
  }

}

// vim: set expandtab shiftwidth=2:
