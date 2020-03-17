import fs from 'fs';
import refractor from 'refractor/core';
import c from 'refractor/lang/c';

refractor.register(c);

let str;
let inOpen;
let inPcn;

const postProcess = () => {
  str = str.replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/{{}/g, '{\\{}')
    .replace(/{}}/g, '{\\}}')
    .replace(/'/g, '\\textquotesingle{}')
    .replace(/"/g, '\\textquotedbl{}');
};

const processElement = (x) => {
  if (x.type === 'text' || x.type === 'number') {
    let tmp = x.value;
    if (inPcn === 'string') {
      tmp = tmp.replace(/\\/g, '\\textbackslash{}');
    }
    tmp = tmp.replace(/ /g, '\\ ');
    str += tmp;
  }
  if (x.type === 'element') {
    const pcn = `${x.properties.className
      .filter((cn) => cn !== 'token').join('')}`;
    inPcn = pcn;
    str += `\\nk${pcn}{`;
    inOpen = 1;
  }
  const children = x.children;
  if (children) {
    children.forEach((child) => processElement(child));
  }
  if (inOpen === 1) {
    str += '}';
    inOpen = 0;
  }
};

export const parseJsonToLatexCallback = (json) => {
  str = '';
  json.forEach((x) => {
    processElement(x);
  });
  postProcess();
  return str;
};

export const parseJsonToLatex = () => {
  fs.readFile('./etc/testPrintf.c', 'utf8', (err, data) => {
    if (err) {
      console.error('Error', err);
      return err;
    }
    console.log(parseJsonToLatexCallback(refractor.highlight(data, 'c')));
  });
};
