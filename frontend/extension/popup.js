const SITE_URL = 'http://localhost:3001';

(async () => {
  const [{ value: csrfToken }, { value: sessionID }] = await Promise.all([
    browser.cookies.get({
      url: SITE_URL,
      name: 'ct',
    }),
    browser.cookies.get({
      url: SITE_URL,
      name: 'sid',
    }),
  ]);

  const response = await fetch('http://localhost:3000/auth/me', {
    headers: {
      Cookie: `sid=${sessionID}`,
      'X-CSRF-Token': csrfToken,
    },
  });
  const meData = await response.json();
  const loggedInDataParagraph = document.getElementById('logged-in-data');
  if (meData.email) {
    loggedInDataParagraph.innerHTML = `Logged in as <b>${meData.email}</b>`;
    loggedInDataParagraph.outerHTML += '<p>Right-click on any email input to fill in an alias</p>';
  } else {
    loggedInDataParagraph.innerHTML = `Please go to <a href="${SITE_URL}">${SITE_URL}</a> and log in`;
  }
})();
