# Deploy to mealgame.biz

# Run tests
./test.sh

# Build to tmp file, then overwrite current build/script.js
mkdir -p build
browserify -t reactify script.jsx > build/_script.js
git checkout gh-pages
mv build/_script.js build/script.js
git add build/script.js

# Static assets need to be moved like so:
git checkout master index.html
git checkout master style.css
git checkout master meal-options.js

# Commit and push changes
git commit -m "deploy"
git push origin gh-pages

# Return to master
git checkout master
