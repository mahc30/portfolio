#!/bin/bash

git checkout main
cd ../portfolio-app/
npm run build
mv ./portfolio-app/build ../myStuff/
cd ..
git checkout gh-pages
rm -r ./images
rm -r ./static
rm asset-manifest..json index.html manifest.json robots.txt
mv ./myStuff/build/* ./
git add .
git commit -m 'Auto Deploy Script'
git push origin gh-pages