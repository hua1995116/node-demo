// import { getOptions } from "loader-utils";
// import validateOptions from 'schema-utils';
const { getOptions } = require("loader-utils");

// const schema = {
//   type: 'object',
//   properties: {
//     test: {
//       type: 'string'
//     }
//   }
// }

module.exports = function (source) {
  const options = getOptions(this);

  const lines = source.split('\n');
  let str = ``;
  if (lines[0].indexOf('name') === 0) {
    str = `export const name = "${lines[0].split(":")[1]}"`
  }
  return str;
}
