browser.webRequest.onBeforeSendHeaders.addListener(addCookie, {
  urls: ['https://api.leetrooms.com/*'],
}, ['blocking', 'requestHeaders']);

let authToken = '';
browser.storage.local.get('authToken').then((t)=>addDynRule(t?.authToken));
browser.storage.local.onChanged.addListener((changes) => {
  if (changes?.authToken?.newValue) {
    addDynRule(changes?.authToken?.newValue);
  }
});

function addDynRule(token) {
  authToken = token || authToken || '';
  return;
}

function addCookie(details) {
  const currentHeaders = details.requestHeaders;
  console.log(authToken);
  currentHeaders.push({'name': 'X-Modified-By', 'value': 'Leetrooms-Firefox'});
  if (!currentHeaders.find(x=>x.name === 'Cookie')) currentHeaders.push({'name': 'Cookie', 'value': authToken || ''});
  else currentHeaders.find(x=>x.name === 'Cookie').value = `${authToken};`
  return {requestHeaders: currentHeaders};
}

function snipeCookie(details) {
  const headers = details.responseHeaders;
  const cookie = headers.find(x=>x.name === 'set-cookie')?.value;
  if (!cookie) return;
  browser.storage.local.set({authToken: cookie.match(/leetrooms.sid.+?;/g)?.[0] || ''});
  
}

browser.webRequest.onHeadersReceived.addListener(snipeCookie, {
  urls: ['https://api.leetrooms.com/auth/*?*'],
}, ['responseHeaders']);