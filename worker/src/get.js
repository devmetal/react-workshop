const request = require('request');

const get = url => new Promise((resolve, reject) => {
  request(url, (err, resp, body) => {
    if (err) return reject(err);
    if (!resp) return reject(new Error(`No response from ${url}`));
    if (resp.statusCode !== 200) return reject(new Error(`GET ${url} ${resp.statusCode}`));
    if (!body.length) return reject(new Error(`GET ${url} no content`));
    return resolve(body);
  });
});

module.exports = get;
