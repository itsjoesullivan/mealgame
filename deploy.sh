./build.sh
git checkout gh-pages
git add build/script.js
git commit -m "new build"
git push origin gh-pages
git checkout master
