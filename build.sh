# clean
rm -rf app/dist
mkdir app/dist

# build
yarn build-app
yarn build-assets
yarn build-types

# src.zip
git archive -o app/dist/src.zip master --format zip -9

# asar
cd app/dist
mkdir asar
cp -r assets ../code ../index.js ../package.json ../preload.js ../spacetime.js ../icon.png asar
asar pack asar app.asar

# web.zip
cd assets
zip -qr9 ../web.zip *

# unx.zip
cd ../linux-unpacked
rm -f resources/app.asar
cp ../app.asar resources/app.asar
zip -qr9 ../unx.zip *

# win.zip
cd ../win-unpacked
rm -f resources/app.asar
cp ../app.asar resources/app.asar
zip -qr9 ../win.zip *
