/**
 * Copyright (c) 2017 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License.
 *
 * Receive json from stdin, build live document in jsdom, write to stdout.
 * Dangerously runs renderjson pkg in node. MAKE SURE IT IS SAFE ALWAYS.
 */
const jsdom = require('./jsdom');
const fs = require('fs');
let jsonInputString = '';

/**
 * Collect stdin data
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_data
 */
process.stdin.on('data', function (data) {
  jsonInputString += data;
});

/**
 * On stdin data completion, build the live document in jsdom.
 * Write to stdout.
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_end
 */
process.stdin.on('end', function () {
  // NOTE: renderjson MUST not be malicious. MAKE SURE.
  const { serialize } = jsdom.start(
    `<!doctype html><html><head>
    <script>
      ${fs.readFileSync(require.resolve('renderjson'))}
    </script>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        var body = document.querySelector('body');
        body.appendChild(
          renderjson(${jsonInputString})
        );
        // mitigate renderjson bug (first pre.renderjson is bogus)
        document.querySelector('.renderjson').style.display = 'none';
      }, {
        once: true
      })
    </script>
    </head><body></body></html>`, {
      runScripts: 'dangerously'
    }
  );

  process.stdout.write(
    serialize()
  );

  jsdom.stop();
});
