# React recipe app with database backend via RESTful API

This project relies on an API server (Node.js Express), at

    https://recipeapi.greyling.tech

with several endpoints, e.g.

- /api/v2/recipe
- /api/v2/recipes
- /api/v2/by-ingredient
- /api/v2/search

See [my GitHub project page](https://github.com/marcg1968/njs-express-mongodb-recipes)

## Environment

A file `.env` (not checked in to version control) needs to exist with the following variables:

```
REACT_APP_VERSION=$npm_package_version
REACT_APP_NAME=$npm_package_name
REACT_APP_API_TOKEN="<TOKEN>"
```

where `<TOKEN>` matches one of the hardcoded tokens in the Node.js Express API server.

## Development

Local development:

`yarn start`

runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Building and deploying

### Building

e.g. to production demo site at [https://demo-react-recipeapp.titbits.tech](https://demo-react-recipeapp.titbits.tech)

 `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment

The ``.htaccess`` file at the document root should contain the following:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

Transferring the built components by `rsync`:

```bash
rsync -avr -e 'ssh -p 65002' \
    --delete-before \
    ./build/static/ \
    u417874717@titbits.tech:~/domains/demo-react-recipeapp.titbits.tech/public_html/static/
rsync -avr -e 'ssh -p 65002' \
    ./build/ \
    u417874717@titbits.tech:~/domains/demo-react-recipeapp.titbits.tech/public_html/
```
