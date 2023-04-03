# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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
#rsync -avrz -e 'ssh -p 65002' ./build/ u417874717@titbits.tech:~/domains/demo-react-recipeapp.titbits.tech/public_html/
rsync -avr -e 'ssh -p 65002' --delete-before ./build/static/ u417874717@titbits.tech:~/domains/demo-react-recipeapp.titbits.tech/public_html/static/
rsync -avr -e 'ssh -p 65002' ./build/ u417874717@titbits.tech:~/domains/demo-react-recipeapp.titbits.tech/public_html/
```
