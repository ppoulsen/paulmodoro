import getDb from './index';

export function createSession(session) {
  return getDb().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('history', 'readwrite');
    const store = tx.objectStore('history');
    const request = store.add(session);
    request.onerror = (e) => reject(e);
    request.onsuccess = () => {
      resolve(request.result);
    };
  }));
}

export function updateSession(key, updatedSessionFields) {
  return getDb().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('history', 'readwrite');
    const store = tx.objectStore('history');
    const getRequest = store.get(key);
    tx.onerror = e => reject(e);
    getRequest.onsuccess = () => {
      const currentValue = getRequest.result;
      const nextValue = {
        ...currentValue,
        ...updatedSessionFields,
      };
      const updateRequest = store.put(nextValue);
      updateRequest.onsuccess = () => resolve(updateRequest.result);
    };
  }));
}

export function getRecentDescriptions(maxSessions = 1000) {
  return getDb().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('history', 'readonly');
    const store = tx.objectStore('history');
    const cursorRequest = store.openCursor(undefined, 'prev');
    const results = new Set();
    let counter = maxSessions;
    cursorRequest.onsuccess = event => {
      const cursor = event.target.result;
      if (!cursor) return;
      if (cursor.value.description) results.add(cursor.value.description);
      counter -= 1;
      if (counter > 0) cursor.continue();
    };
    tx.oncomplete = () => resolve(Array.from(results));
    tx.onerror = e => reject(e);
  }));
}

export function getSessions() {
  return getDb().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction('history', 'readonly');
    const store = tx.objectStore('history');
    const cursorRequest = store.openCursor(undefined, 'prev');
    const results = [];
    cursorRequest.onsuccess = event => {
      const cursor = event.target.result;
      if (!cursor) return;
      if (cursor.value) results.push(cursor.value);
      cursor.continue();
    };
    tx.oncomplete = () => resolve(results);
    tx.onerror = e => reject(e);
  }));
}
