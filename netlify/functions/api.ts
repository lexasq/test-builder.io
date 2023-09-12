// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
import express, { Router } from 'express';
import serverless from 'serverless-http';

let axios = require('axios');
let builderApiKey = 'ea8c8e416fd64171bc2ef9ac5ac226e6';
const app = express();
const router = Router();

// Put this route last, so you will catch anything not matched by your code
router.get('*', async (req, res) => {
  let page = await axios
    .get(
      `https://cdn.builder.io/api/v1/html/page?url=${encodeURI(req.url)}&apiKey=${builderApiKey}`
    )
    .catch(handleError);

  if (page && page.data) {
    res.send(template({ body: page.data.data.html }));
  } else {
    res.send(
      template({
        body: `<h2>No content found :(</h2><p>Have you published a Builder page for this URL?</p }>`,
      })
    );
  }
});
app.use('/favicon.ico', express.static('/favicon.ico'));
app.use('/', router);

let handleError = err => {
  if (err.response.status === 404) {
    // Catch 404s - no page was found for this URL, that's fine
  } else {
    console.warn(err);
  }
  return null;
};

// Basic function to render content within a standard header and footer
// You can use any templating system you choose
let template = ({ body }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Zephyr Cloud</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <style>
        button:disabled,
        button[disabled]{
          background-color: #cccccc !important;
          color: #666666 !important;
        }

        body {
          overflow: auto;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <main>${body}</main>
      <footer>
      </footer>
    </body>
  </html>
`;

export const handler = serverless(app);
