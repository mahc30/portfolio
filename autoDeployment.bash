#!/bin/bash

mv ../portfolio-app/build ./
git checkout gh-pages
cd ..
rm -r ./images
rm -r ./static
rm asset-manifest..json index.html manifest.json robots.txt
mv ./myStuff/build/* ./
git add .
git commit -m 'Auto Deploy Script'
git push origin gh-pages