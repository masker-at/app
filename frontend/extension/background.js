function createMenus() {
  browser.menus.create({
    id: 'create-alias',
    title: 'Create new alias',
    contexts: ['editable'],
  });
  browser.menus.create({
    id: 'use-existing-alias',
    title: 'Use existing alias',
    contexts: ['editable'],
  });
}
createMenus();

let aliases = [];

browser.menus.onClicked.addListener(async function (info, tab) {
  switch (info.menuItemId) {
    case 'create-alias':
      await browser.tabs.executeScript(tab.id, {
        code: `maskerAtCreateAlias(${info.targetElementId})`,
      });
      break;

    default:
      if (info.menuItemId.startsWith('use-existing-alias-')) {
        const id = Number(info.menuItemId.replace('use-existing-alias-', ''));
        const alias = aliases.find(alias => alias.id === id);
        await browser.tabs.executeScript(tab.id, {
          code: `maskerAtInsertAlias(${info.targetElementId}, '${alias.address}')`,
        });
      }
  }
});

const SITE_URL = 'http://localhost:3001';

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case 'create-alias':
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

        const createResponse = await fetch('http://localhost:3000/aliases/create', {
          headers: {
            Cookie: `sid=${sessionID}`,
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ name: new URL(sender.url).hostname }),
        });
        if (createResponse.status === 200) {
          const createData = await createResponse.json();
          sendResponse(createData);

          browser.menus.create({
            id: `use-existing-alias-${createData.id}`,
            parentId: 'use-existing-alias',
            title: `${createData.name} <${createData.address}>`,
            contexts: ['editable'],
          });
          aliases.push(createData);
        } else {
          sendResponse({ address: null });
          browser.notifications.create({
            title: 'Masker@: Error',
            message: 'Couldn\'t create an alias. Please try again',
          });
        }
      })();
      return true;

    case 'new-tab':
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
  
        const listResponse = await fetch('http://localhost:3000/aliases/list', {
          headers: {
            Cookie: `sid=${sessionID}`,
            'X-CSRF-Token': csrfToken,
          },
        });
        if (listResponse.status === 200) {
          const aliasesList = await listResponse.json();
          browser.menus.removeAll();
          createMenus();
          for (const alias of aliasesList) {
            browser.menus.create({
              id: `use-existing-alias-${alias.id}`,
              parentId: 'use-existing-alias',
              title: alias.name ? `${alias.name} <${alias.address}>` : alias.address,
              contexts: ['editable'],
            });
          }
          browser.menus.refresh();
          aliases = aliasesList;
        }
      })().catch(console.error);
      return true;

    default:
      return false;
  }
});
