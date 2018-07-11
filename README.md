# itunes-plays
iTunes play count visualizer

![screenshot](https://i.imgur.com/YAqVzIa.png)

## Usage
1. Open **iTunes** -> **File** - **Preferences** `⌘,` -> **Advanced** -> Check **Share iTunes Library XML with other applications**

2. Create `.env` file and set `ITUNES_LIBRARY` to the path of your **iTunes Library XML**. For example:
```
ITUNES_LIBRARY=/Users/chalk/Music/iTunes/iTunes Music Library.xml
```

3. `yarn && yarn start`

## License
[MIT License](LICENSE)
