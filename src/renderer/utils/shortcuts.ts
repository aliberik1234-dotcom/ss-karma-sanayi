export const SHORTCUT_EVENTS = {
  OPEN_NEW_PAYMENT: 'shortcut:open-new-payment',
  OPEN_MEMBER_SEARCH: 'shortcut:open-member-search',
  OPEN_ADD_MEMBER: 'shortcut:open-add-member',
  OPEN_DASHBOARD: 'shortcut:open-dashboard',
  CLOSE_MODAL: 'shortcut:close-modal',
} as const;

export const dispatchShortcut = (event: string) => {
  window.dispatchEvent(new CustomEvent(event));
};

export const listenShortcut = (event: string, callback: () => void): (() => void) => {
  window.addEventListener(event, callback);
  return () => window.removeEventListener(event, callback);
};
