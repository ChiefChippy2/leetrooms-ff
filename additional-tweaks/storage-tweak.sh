sed -Ei 's/ of Object.entries\(changes\).+?$/&if (oldValue === newValue) continue;/' files/content.js
sed -Ei 's/ of Object.entries\(changes\).+?$/&if (oldValue === newValue) continue;/' files/panel.js