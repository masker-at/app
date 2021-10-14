const SITE_URL = 'https://app.masker.at';

(async () => {
  const [csrfToken, sessionID] = await Promise.all([
    browser.cookies.get({
      url: SITE_URL,
      name: 'ct',
    }),
    browser.cookies.get({
      url: SITE_URL,
      name: 'sid',
    }),
  ]);

  const response = await fetch('https://api.masker.at/auth/me', {
    headers: {
      Cookie: `sid=${sessionID?.value}`,
      'X-CSRF-Token': csrfToken?.value,
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
