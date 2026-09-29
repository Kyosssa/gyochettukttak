(() => {
  if (window.__gyochettukttakCoupangCarousel) return;
  window.__gyochettukttakCoupangCarousel = true;

  const banner = document.querySelector('[data-coupang-carousel]');
  if (!banner || !banner.closest('main') || document.querySelectorAll('[data-coupang-carousel]').length !== 1) {
    banner?.remove();
    return;
  }

  const slot = banner.querySelector('[data-coupang-slot]');
  const compact = window.matchMedia('(max-width: 720px)').matches;
  const config = compact
    ? { id: 1032289, trackingCode: 'AF4293553', subId: null, template: 'carousel', width: '320', height: '100' }
    : { id: 1034259, trackingCode: 'AF4293553', template: 'carousel', width: '728', height: '90', tsource: '' };
  let placed = false;
  let timeout;

  const cleanup = () => {
    observer.disconnect();
    window.clearTimeout(timeout);
    if (!placed) banner.remove();
  };
  const isCarouselFrame = (frame) => frame instanceof HTMLIFrameElement && (
    frame.id.startsWith(String(config.id)) || /(^|\.)ads-partners\.coupang\.com/i.test(frame.src)
  );
  const place = (frame) => {
    if (!isCarouselFrame(frame)) return;
    if (placed) {
      frame.remove();
      return;
    }
    placed = true;
    frame.width = config.width;
    frame.height = config.height;
    frame.title = '쿠팡 파트너스 광고';
    slot.replaceChildren(frame);
    banner.querySelectorAll('a[href]').forEach((link) => {
      link.rel = 'sponsored noopener noreferrer';
    });
    banner.hidden = false;
    cleanup();
  };
  const scan = (root = document) => root.querySelectorAll?.('iframe').forEach(place);
  const observer = new MutationObserver((records) => {
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      if (node.matches?.('iframe')) place(node);
      scan(node);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  timeout = window.setTimeout(cleanup, 5000);

  const render = () => {
    if (!window.PartnersCoupang?.G) return cleanup();
    try {
      new window.PartnersCoupang.G(config);
      scan();
    } catch (_) {
      cleanup();
    }
  };
  const loader = document.createElement('script');
  loader.src = 'https://ads-partners.coupang.com/g.js';
  loader.async = true;
  loader.onload = render;
  loader.onerror = cleanup;
  document.head.append(loader);
})();
