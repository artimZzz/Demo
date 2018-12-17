# Offsite Test

Offsite Testing for react-native

This project is made by [@Tim](https://github.com/jayesbe)'s as an offsite testing demonstration.

## Running Environment

System:

    OS: macOS 10.14.1

Binaries:

    Node: 11.3.0 - /usr/local/bin/node

    Yarn: 1.12.3 - /usr/local/bin/yarn

    npm: 6.4.1 - /usr/local/bin/npm

    Watchman: 4.9.0 - /usr/local/bin/watchman

SDKs:

    iOS SDK:

    Platforms: iOS 12.1, macOS 10.14, tvOS 12.1, watchOS 5.1

IDEs:

    Android Studio: 3.2 AI-181.5540.7.32.5056338

    Xcode: 10.1/10B61 - /usr/bin/xcodebuild

npmPackages:

    react: 16.6.1 => 16.6.1 

    react-native: 0.57.7 => 0.57.7 

## Tested On

iOS:

    simulator - iPhone XS 12.1

Android:

    simulator - Nexus 5X API 27


## How To Run

MacOSX

    1. download as zip from gitHub

    2. upzip

    3. download node_modules.zip from google drive

    4. upzip node_modules under project folder

    5. open Terminal

    6. go to project folder

    7. react-native run-ios / react-native run-android


## Starting Page

./src/View/Screen/LandingScreen.js

```js
export default class LandingScreen extends Screen {

	/* constructor */
	constructor(props) {
		super(props);

		changeLocale('zhhk');

		/* variable */
		this.keyExtractor = (item, index) => index.toString();
		this.filterKeys = ['name', 'category', 'author', 'summary'];
		this.lockEndReached = false;
        this.forceOnline = false;
        ...
```

## Installed Modules

react-navigation

    https://reactnavigation.org/docs/en/getting-started.html

        ## Navigation for push screen / tab seperation ##



react-native-vector-icons

    https://github.com/oblador/react-native-vector-icons

        ## Render vector icon True Type Font  ##



react-native-cached-image

    https://github.com/kfiroo/react-native-cached-image

        ## Support Image Caching ##



react-native-i18n

    https://github.com/AlexanderZaytsev/react-native-i18n

        ##  Support Multilanguage ##



ramda

    https://github.com/ramda/ramda

        ## Make use of { pathOr } for parsing return JSON ##



moment

    https://momentjs.com

        ## Make use for calculating expiry time of API caching  ##



enzyme

    https://jestjs.io/docs/en/tutorial-react

        ## Make use for shallow rendering in yarn test ##



enzyme-adapter-react-16

    https://www.npmjs.com/package/enzyme-adapter-react-16

        ## Required for running enzyme ##



react-dom

    https://www.npmjs.com/package/react-dom
    
        ## Required for running enzyme-adapter-react-16 ##