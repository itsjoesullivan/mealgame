browserify -t reactify script.jsx > build/_script.js
git checkout gh-pages
mv build/_script.js build/script.js
git add build/script.js
git commit -m "new build"
git push origin gh-pages
git checkout master
