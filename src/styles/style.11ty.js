const fs = require('fs');
const path = require('path');

const postcss = require('postcss');
const functions = require('postcss-functions');

const filename = 'style.css';

const functionsOptions = {
  functions: {
    repeatChar(char, count) {
      return `'${char.repeat(count)}'`;
    }
  }
};

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `${filename}`);
    return {
      permalink: `static/css/${filename}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([require('precss'), functions(functionsOptions)])
      .process(rawCss, { from: rawFilepath })
      .then(res => {
        // console.log(res);
        return res.css;
      });
  }
};
