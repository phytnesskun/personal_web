// Set the entry language before the experiment starts. The experiment owns its state.
const entryLanguage = new URLSearchParams(location.search).get('lang');
if (entryLanguage === 'zh' || entryLanguage === 'en') {
  try { localStorage.setItem('physics-lab-language', entryLanguage); }
  catch { /* The language button below also works without browser storage. */ }
}

document.addEventListener('DOMContentLoaded', () => {
  const brand = document.querySelector('.site-header .brand');
  const toggle = document.getElementById('language-toggle');
  if (!brand || !toggle) return;
  const currentLanguage = () => document.documentElement.lang.startsWith('en') ? 'en' : 'zh';
  if ((entryLanguage === 'zh' || entryLanguage === 'en') && currentLanguage() !== entryLanguage) {
    toggle.click();
  }
  function updateReturnLink() {
    const language = currentLanguage();
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    const label = language === 'zh' ? '返回项目介绍' : 'Back to project';
    brand.href = `/${language}/projects/virtual-lab/`;
    brand.setAttribute('aria-label', label);
    brand.title = label;
    const name = brand.querySelector('span');
    if (name) {
      const detail = document.createElement('small');
      detail.textContent = `← ${label}`;
      name.replaceChildren(document.createTextNode('Bingkun Qi'), detail);
    }
  }
  updateReturnLink();
  toggle.addEventListener('click', updateReturnLink);
});
