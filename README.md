## Calculator
A simple calculator written in vanilla ES6 javascript.

This project was originally thrown together on codepen, but in an effort to improve it, I pulled the code into a local npm package and completely re-wrote the javascript using real deal, test first, TDD with jest as my test library. It was awesome. Then I added babel and webpack in order to bundle it up and show it off. 

## TODO:

Could attempt to make it mobile first and responsive.
It probably needs some more tests? For edge cases and the like.
So far though, no code (other than the little bit of display code in index.js) was 
written without first having a failing test written.

## Usage.

Get the package.
```
git clone https://github.com/recursion/calculator
npm install
```

Develop / dev server
```
npm run dev
```

Build
```
npm run build
```

Test
```
npm run test
```

Test watch
```
npm run test:watch
```

Lint
```
npm run lint
```

## License
MIT License

## Contributing
Feel free to make PR for anything that makes sense.
