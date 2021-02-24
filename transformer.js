class State {

  static github = {
    success: 'passed',
    failure: 'failed',
    neutral: 'skipped',
    cancelled: 'cancelled',
    skipped: 'skipped',
    timed_out: 'failed',
    action_required: 'action_required',
    queued: 'started',
    in_progress: 'started',
    completed: 'passed'
  };

  static travis = {
    passed: 'passed',
    errored: 'failed',
    failed: 'failed',
    canceled: 'cancelled',
    started: 'started'
  };

}

class Transformer {

  static travis (payload) {
    return {
      id: payload.id,
      number: '#'.concat(payload.number),
      url: `https://travis-ci.com/${payload.repository.slug}/builds/${payload.id}`,
      state: State.travis[payload.state],
      repository: {
        name: payload.repository.name,
        slug: payload.repository.slug
      },
      commit: {
        compare_url: payload.commit.compare_url,
        message: payload.commit.message,
        sha: payload.commit.sha
      },
      branch: {
        name: payload.branch.name
      },
      duration: payload.duration,
      started_at: payload.started_at,
      finished_at: payload.finished_at
    };
  }

  static github (payload) {
    return {
      id: payload.id,
      number: '#'.concat(payload.run_number),
      url: payload.html_url,
      state: State.github[payload.conclusion || payload.status],
      repository: {
        name: payload.repository.name,
        slug: payload.repository.full_name
      },
      commit: {
        compare_url: `https://github.com/${payload.repository.full_name}/compare/${payload.head_commit.id}~1...${payload.head_commit.id}`,
        message: payload.head_commit.message,
        sha: payload.head_commit.id
      },
      branch: {
        name: payload.head_branch
      },
      duration: (Number(new Date(payload.updated_at)) - Number(new Date(payload.created_at))) / 1000,
      started_at: payload.created_at,
      finished_at: payload.updated_at
    };
  }

}

// vim: set expandtab shiftwidth=2:
