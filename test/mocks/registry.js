const nock = require('nock')

const availableModule = {
  'dist-tags': {
    latest: '1.33.7',
    foo: '0.8.15'
  },
  versions: {
    '0.8.15': {
      gitHead: 'bar'
    },
    '1.33.7': {
      gitHead: 'HEAD'
    }
  }
}

const completelyUnpublishedModule = {
  name: 'i-am-completely-unpublished',
  time: {
    '2.0.0': '2016-12-01T17:50:30.699Z',
    unpublished: {
      time: '2016-12-01T17:53:45.940Z'
    }
  }
}

const missingGitHead = {
  'dist-tags': {
    latest: '3.0.3'
  },
  versions: {
    '3.0.2': {
      gitHead: 'hash'
    },
    '3.0.3': {}
  }
}

module.exports = nock('http://registry.npmjs.org')
  .get('/available')
  .reply(200, availableModule)
  .get('/tagged')
  .times(2)
  .reply(200, availableModule)
  .get('/untagged')
  .reply(200, availableModule)
  .get('/@scoped%2Favailable')
  .reply(200, availableModule)
  .get('/completely-unpublished')
  .reply(200, completelyUnpublishedModule)
  .get('/missingGitHead')
  .reply(200, missingGitHead)
  .get('/unavailable')
  .reply(404, {})
  .get('/unavailable-no-body')
  .reply(404)
  .get('/unavailable-no-404')
  .times(2)
  .replyWithError({message: 'not found', statusCode: 500, code: 'E500'})
