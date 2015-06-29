mkdir -p build
browserify -t reactify script.jsx > build/_script.js
git checkout gh-pages
mv build/_script.js build/script.js
git checkout master index.html
git checkout master style.css
git checkout master meal-options.js
git add build/script.js
git commit -m "new build"
git push origin gh-pages
git checkout master
