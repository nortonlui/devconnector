const request = require('request');

const githubUserInfo = (user, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${user}/repos?per_page=5&sort=create:asc`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode != 200) {
        return res.status(404).send({ msg: 'Not found Github profile' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  githubUserInfo,
};
