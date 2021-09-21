const { spawn } = require('child_process');
const {parseAnsi, ansi2html, parseHtml} = require('ansi-color-parse');

// const str = "\u001b[34mHello\u001b[39m World\u001b[31m!\u001b[39m";

// const parseList = parseAnsi(str);

// console.log(parseList);
// [ { foreground: 'blue', text: 'Hello' },
//   { text: ' World' },
//   { foreground: 'red', text: '!' } ]

// console.log(ansi2html(parseList));
// <span class="blue">Hello</span><span> World</span><span class="red">!</span>

const cmd = spawn('sh', ['build.sh']);

let text = "";

cmd.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  text += (data.toString());
});

cmd.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
  text += (data.toString());
});

cmd.on('close', (code) => {
  // console.log((text));
  const parseList = parseAnsi(text);
  // console.log(parseList);
  console.log("<div>"+ ansi2html(parseList, '</div><div>') + "</div>");
//   console.log(`child process exited with code ${code}`);
    
});