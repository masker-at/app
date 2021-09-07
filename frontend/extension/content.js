const maskerAtCreateAlias = async (targetElementId) => {
  const input = browser.menus.getTargetElement(targetElementId);
  const { address } = await browser.runtime.sendMessage({ type: 'create-alias' });
  if (address) input.value = address;
};

const maskerAtInsertAlias = async (targetElementId, address) => {
  const input = browser.menus.getTargetElement(targetElementId);
  input.value = address;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
};

browser.runtime.sendMessage({ type: 'new-tab' });
