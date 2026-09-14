/* BNS — Google Form link config.
 * Live responder URL (forms.gle short link is accepted).
 * The banner on contact.html stays hidden until this URL is configured,
 * so no placeholder link ever ships.
 */
var BNS_FORM_URL = 'https://forms.gle/eopE8URpurzh1ekr7';

(function () {
  function isConfigured(u) {
    return typeof u === 'string' && (u.indexOf('https://docs.google.com/forms/') === 0 || u.indexOf('https://forms.gle/') === 0);
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (!isConfigured(BNS_FORM_URL)) return;
    document.querySelectorAll('[data-bns-form]').forEach(function (el) {
      if (el.tagName === 'A') {
        el.href = BNS_FORM_URL;
        el.target = '_blank';
        el.rel = 'noopener';
      }
      el.hidden = false;
    });
  });
})();
