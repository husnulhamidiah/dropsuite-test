# Dropsuite Assessment

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)

## Prerequisites

1. Use Linux or Mac, this will not work on Windows. [Why?](#notes)
2. Node.js v8.0.0 or higher installed

## Usage

Install all the required modules

```
    npm install
```

Use the script in the form of `npm start YOUR_PATH`. The path can be relative or absolute.

```
    npm start ./sample
    npm start /home/user/sample
```

## Notes

Although, it's prohibited to use any framework, here I use two modules to help me write better and cleaner code. Those module doesn't affect logic of the app. Those modules are:

1. [Esm](https://github.com/standard-things/esm) — To provide all the glory of ES6 features
2. [ESLint](https://eslint.org/) — Force me to write a cleaner codes

Since I can't use any library or framework, I'm using the built-in tool `find` and `shasum` to find all files in a directory recursively and calculate hash each. The downside of this method is we can't use this app on Windows because Windows has no `shasum` command.

Now, about the performance — I do benchmark on Ubuntu (linux) for ~7000 files using `find` and a couple checksum commands. Here's the result:

- `shasum` — 155,50s user 24,54s system 98% cpu 3:02,36 total
- `sha1sum` — 4,98s user 2,29s system 96% cpu 7,559 total
- `md5sum` — 5,02s user 2,28s system 95% cpu 7,624 total

I don't have Mac so I just use `shasum` to calculate checksum, maybe we can do benchmarking next time to improve the overall performance.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)