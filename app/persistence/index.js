import setupHistoryStore from './historySetup';

const DB_NAME = 'PAULMODORO';
const DB_VERSION = 1;

const storeSetupFunctions = [setupHistoryStore];

const promise = new Promise((resolve, reject) => {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onsuccess = function onOpenSuccess() {
    resolve(this.result);
  };
  request.onerror = function onOpenError(e) {
    reject(e);
  };
  request.onupgradeneeded = function onOpenUpgrade(versionChangeEvent) {
    storeSetupFunctions.forEach(storeSetupFunction => storeSetupFunction(versionChangeEvent));
  };
});

export default function getDb() {
  return promise;
}
