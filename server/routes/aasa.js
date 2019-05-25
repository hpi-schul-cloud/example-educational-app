import Router from 'express-promise-router';

let router = new Router();

router.get('/apple-app-site-association', async (req, res) => {

  console.log("called");

  res.json({
    "webcredentials": {
      "apps": [
        "WP53SSE8S6.ai.unruh.example-iphone-app",
      ]
    },
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": "WP53SSE8S6.ai.unruh.example-iphone-app",
          "paths": ["*"]
        }
      ]
    }
  });
  // res.removeHeader("Content-Type");
  // res.header("Content-Type", "application/pkcs7-mime");
});

export default router;
