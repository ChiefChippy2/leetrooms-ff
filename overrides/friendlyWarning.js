const visits = Number(sessionStorage.getItem('visitInSession')) || 0
if (visits === 2) document.querySelector('div').innerHTML += `
<br>If you have trouble logging in, please go to <a style='color: blue' href='about:addons'>Addons Page</a>, manage leetrooms extensions, and enable all the optional permissions.`
else sessionStorage.setItem('visitInSession', visits + 1);