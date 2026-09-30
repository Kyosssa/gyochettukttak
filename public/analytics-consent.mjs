export const ANALYTICS_ID = 'G-5X5CFLGLYQ';
export const CONSENT_KEY = 'gyochettukttak:analytics-consent';

export const isOfficialAnalyticsOrigin = (currentLocation) =>
  currentLocation?.protocol === 'https:' && currentLocation?.hostname === 'gyochettukttak.com';

export const cleanPageLocation = (currentLocation) => `${currentLocation.origin}${currentLocation.pathname}`;

export function disableAnalytics(windowObject = window) {
  windowObject[`ga-disable-${ANALYTICS_ID}`] = true;
}

export function loadAnalytics({ windowObject = window, documentObject = document, locationObject = location } = {}) {
  if (!isOfficialAnalyticsOrigin(locationObject) || windowObject.__gyochettukttakGaLoaded) return false;
  windowObject.__gyochettukttakGaLoaded = true;
  windowObject[`ga-disable-${ANALYTICS_ID}`] = false;
  windowObject.dataLayer = windowObject.dataLayer || [];
  function gtag() { windowObject.dataLayer.push(arguments); }
  windowObject.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  gtag('consent', 'update', { analytics_storage: 'granted' });
  gtag('js', new Date());
  gtag('config', ANALYTICS_ID, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  if (!windowObject.__gyochettukttakGaPageView) {
    windowObject.__gyochettukttakGaPageView = true;
    gtag('event', 'page_view', {
      page_location: cleanPageLocation(locationObject),
      page_path: locationObject.pathname,
      page_title: documentObject.title
    });
  }
  const loader = documentObject.createElement('script');
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  loader.dataset.gyochettukttakAnalytics = 'true';
  documentObject.head.append(loader);
  return true;
}

export function startAnalyticsConsent({ windowObject = window, documentObject = document, locationObject = location, storage = localStorage, loadImpl = loadAnalytics, disableImpl = disableAnalytics } = {}) {
  const panel = documentObject.querySelector('[data-analytics-consent]');
  const settings = documentObject.querySelector('[data-analytics-settings]');
  if (!panel || !settings) return;
  if (!isOfficialAnalyticsOrigin(locationObject)) {
    panel.remove();
    settings.remove();
    return;
  }

  const show = () => {
    panel.hidden = false;
    documentObject.body.classList.add('analytics-consent-open');
    const updateHeight = () => documentObject.body.style.setProperty('--analytics-consent-height', `${panel.offsetHeight}px`);
    updateHeight();
    windowObject.requestAnimationFrame(updateHeight);
  };
  const hide = () => {
    panel.hidden = true;
    documentObject.body.classList.remove('analytics-consent-open');
    documentObject.body.style.removeProperty('--analytics-consent-height');
  };
  let choice = null;
  try { choice = storage.getItem(CONSENT_KEY); } catch (_) {}
  if (choice === 'granted') loadImpl({ windowObject, documentObject, locationObject });
  else {
    disableImpl(windowObject);
    if (choice !== 'denied') show();
  }

  panel.querySelector('[data-analytics-allow]')?.addEventListener('click', () => {
    try { storage.setItem(CONSENT_KEY, 'granted'); } catch (_) {}
    hide();
    loadImpl({ windowObject, documentObject, locationObject });
  });
  panel.querySelector('[data-analytics-deny]')?.addEventListener('click', () => {
    try { storage.setItem(CONSENT_KEY, 'denied'); } catch (_) {}
    disableImpl(windowObject);
    hide();
  });
  settings.addEventListener('click', show);
}
