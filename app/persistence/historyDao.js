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
    tx.onerror = (e) => reject(e);
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
