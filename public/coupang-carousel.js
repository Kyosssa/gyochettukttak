(() => {
  if (window.__gyochettukttakCoupangCarousel) return;
  window.__gyochettukttakCoupangCarousel = true;

  const banners = [...document.querySelectorAll('[data-coupang-carousel]')];
  if (!banners.length) return;

  const compact = window.matchMedia('(max-width: 720px)').matches;
  const config = compact
    ? { id: 1032289, trackingCode: 'AF4293553', subId: null, template: 'carousel', width: '320', height: '100' }
    : { id: 1034259, trackingCode: 'AF4293553', template: 'carousel', width: '728', height: '90', tsource: '' };

  const remove = (banner) => banner.remove();
  const revealWhenReady = (banner, slot) => {
    const reveal = () => {
      if (slot.querySelector('iframe')) {
        banner.hidden = false;
        observer.disconnect();
        clearTimeout(timeout);
      }
    };
    const observer = new MutationObserver(reveal);
    observer.observe(slot, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      if (!slot.querySelector('iframe')) remove(banner);
    }, 4000);
    reveal();
  };

  const render = () => banners.forEach((banner) => {
    const slot = banner.querySelector('[data-coupang-slot]');
    if (!slot || !window.PartnersCoupang?.G) return remove(banner);
    revealWhenReady(banner, slot);

    // The Coupang constructor uses the script node currently in the document as its insertion point.
    // Keeping this executable node inside the slot anchors the generated iframe in the intended container.
    const runner = document.createElement('script');
    runner.text = `try { new window.PartnersCoupang.G(${JSON.stringify(config)}); } catch (_) { document.currentScript.closest('[data-coupang-carousel]').remove(); }`;
    slot.append(runner);
  });

  const loader = document.createElement('script');
  loader.src = 'https://ads-partners.coupang.com/g.js';
  loader.async = true;
  loader.onload = render;
  loader.onerror = () => banners.forEach(remove);
  document.head.append(loader);
})();
