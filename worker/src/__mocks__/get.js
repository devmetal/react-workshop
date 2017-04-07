/* global jest */

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Mock</title>
  </head>
  <body>
    <h1>Example response</h1>
    <div>
    I just
    <span>use it</span>
    <span><h1>for</h1></span>
    tests
    </div>
  </bod>
</html>
`;

function get() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      resolve(html);
    });
  });
}

module.exports = get;
