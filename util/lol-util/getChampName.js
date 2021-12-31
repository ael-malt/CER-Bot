//convert id to champ
const champions = require("./champions.json");

module.exports = function getChampName(id) {
  let champList = champions.data;
  if (id === -1) return "<:NoBan:807703851246682132>";
  for (var i in champList) {
    if (champList[i].key == id) {
      return champList[i].id;
    }
  }
};
