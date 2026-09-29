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
  const isCarouselFrame = (frame) => frame instanceof HTMLIFrameElement && (
    frame.id.startsWith(String(config.id)) ||
    /(^|\.)ads-partners\.coupang\.com/i.test(frame.src)
  );

  const render = () => banners.forEach((banner) => {
    const slot = banner.querySelector('[data-coupang-slot]');
    if (!slot || !window.PartnersCoupang?.G) return remove(banner);
    let placed = false;
    const place = (frame) => {
      if (!isCarouselFrame(frame)) return;
      if (placed) return frame.remove();
      placed = true;
      frame.width = config.width;
      frame.height = config.height;
      frame.title = '쿠팡 파트너스 광고';
      slot.replaceChildren(frame);
      banner.hidden = false;
      observer.disconnect();
      clearTimeout(timeout);
    };
    const scan = (root = document) => root.querySelectorAll?.('iframe').forEach(place);
    // Coupang's loader can append the iframe at the end of body. Observe from before its constructor runs,
    // then move only this banner's iframe into the page-owned slot inside main.
    const observer = new MutationObserver((records) => {
      for (const record of records) for (const node of record.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches?.('iframe')) place(node);
          scan(node);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => {
      observer.disconnect();
      if (!placed) remove(banner);
    }, 4000);
    scan();

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
