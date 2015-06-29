./build.sh
git checkout gh-pages
git checkout master build/script.js
git add build/script.js
git commit -m "new build"
git push origin gh-pages
git checkout master
