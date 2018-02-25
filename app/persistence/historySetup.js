function setupHistoryVersion1(versionChangeEvent) {
  const db = versionChangeEvent.target.result;
  const store = db.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
  store.createIndex('startTime', 'startTime', { unique: true });
}

const versionUpgradeMap = new Map([
  [1, setupHistoryVersion1],
]);

export default function setupHistoryStore(versionChangeEvent) {
  const { oldVersion, newVersion } = versionChangeEvent;
  versionUpgradeMap.forEach((versionUpgradeFunc, version) => {
    if (version > oldVersion && version <= newVersion) {
      versionUpgradeFunc(versionChangeEvent);
    }
  });
}
