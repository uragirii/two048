# 2048 in React Native

This project is a clone of [famous game 2048](https://play2048.co/) developed by [Gabriele Cirulli](http://gabrielecirulli.com/) in react native. I tried to copy everything including colors, fonts and animations. 2048 is a very fun game which always intrigued me. To play, just swipe around the board to move the tiles and combine them to reach 2048!

<p align="center">
<img src="./screenshots/2048%20Screenshot.png" height="400" title="Screenshot">
</p>

Check the [video of game](./screenshots/2048%20Recording.mp4)

## Why create this?

To be frank, I wanted to test my skills with Animation and Gestures using `react-native-reanimated` and `react-native-gesture-handler` and I always liked this game. To my suprise the animations were quite easy to create and much of my time went into writing code for the Game logic (which I changed from the actual one).

The logic I wrote for game might not be the best one, or the fastest one, but I wrote it keeping in mind how to animate cells. The only other clone ([Check this repo by @liuhong1happy](https://github.com/liuhong1happy/react-native-2048)) I found of 2048 in React native on github was over 7years old, so I thought why not.

## Libraries used

- `react-native-reanimated` : Excellent library for animations in React Native
- `react-native-gesture-handler` : You alreasdy know and use this library in your projects
- `expo` - Expo is the way for React Native Projects
- `expo-fonts` - To load custom fonts used by official website.
- `Clear Sans` Font - [Developed by Intel](https://github.com/intel/clear-sans/tree/main), this is the font used on official website.

_The font is licensed under [Apache 2.0 License](https://github.com/intel/clear-sans/blob/main/LICENSE.txt), which afaik is similar to MIT license, if however you feel I've violated your copywrite, let me know and I will remove the font files from repository_

## I found a bug / Want to contribute

Great news! If you found a bug, please open an issue. I would try to resolve it. If you want to contribute, yay! open a pull request and I would happily review and merge it.

## References:

- Official 2048 links:

  - Play on [official website](https://play2048.co/)
  - Official App on [App Store](https://itunes.apple.com/us/app/2048-by-gabriele-cirulli/id868076805) and [Google Play Store](https://play.google.com/store/apps/details?id=com.gabrielecirulli.app2048)

- Clear Sans is a font developed by Intel, you can check the [official repository](https://github.com/intel/clear-sans/tree/main)
- For the official colors refer to [constants.ts](./src/constants.ts) file
