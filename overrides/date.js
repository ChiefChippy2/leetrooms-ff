const scr = document.createElement('script');
scr.innerText = `
console.log(this);
oldDate = Date;
Date = class  A extends oldDate{constructor(tz){if(typeof tz === 'string') tz=tz.replace(/Z?$/, 'Z');super(tz)};getTimezoneOffset(){return 0}};
window.Date = Date;
globalThis.Date = Date;
top.Date = Date;`;
document.querySelector('*').appendChild(scr);