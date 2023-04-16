# Sample Reat App with proxy configured to be deployed to VERCEL

Short summary how to implement proxy. Current implementation forwards all requests coming to __/api__ location to an API gateway and adds __key__ parameter to URL path:

- install __http-proxy-middleware__ as a project dependency (*npm install http-proxy-middleware*)
- add __/api__ to project folder with __index.js__ in it 
- in __/api/index.js__ there are 2 variables __API_KEY__ and __API_BASEPATH__ created with values retrieved from __process.env__
- in __/api/index.js__ the following adds key parameter to path
```
onProxyReq(proxyReq) {
    const targetURL = new URL(proxyReq.path, API_BASEPATH);
    targetURL.searchParams.set('key', API_KEY);
    proxyReq.path = targetURL.pathname + targetURL.search;
}
```

- in project folder create __vercel.json__ with the following content to redirect all API calls to /api/index.js:
```
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    }
  ]
}
```
- go to VERCEL, create new project (or use existing) and add Environment Variables (under Settings) with respective values for __API_KEY__ and __API_BASEPATH__
- deploy your app to VERCEL

- DONE!


## Resources
(https://mmazzarolo.com/blog/2022-02-05-creating-and-deploying-a-proxy-server-in-5-minutes/)
(https://vercel.com/guides/using-express-with-vercel)
