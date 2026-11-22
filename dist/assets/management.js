// The HTML contains the full case. Keep section links and original images navigable.
function syncManagementFragment() {
  const hash = location.hash;
  const target = document.getElementById(hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
  for (const link of document.querySelectorAll('[data-management-lang]')) {
    link.hash = hash;
  }
}

// When Back reloads the page after opening a full-size image, restore its module
// before the browser restores the scroll position.
const imageModule = document.getElementById(history.state?.imageModule || '');
if (imageModule instanceof HTMLDetailsElement) imageModule.open = true;
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const module = link.closest('.mgmt-module');
  if (module && link.closest('.mgmt-shots')) {
    history.replaceState({ ...history.state, imageModule: module.id }, '');
  }
});
syncManagementFragment();
window.addEventListener('hashchange', syncManagementFragment);
