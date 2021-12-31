module.exports = function getPlatform(platformId) {
  if (platformId == "br") return "BR1";
  if (platformId == "eun") return "EUN1";
  if (platformId == "euw") return "EUW1";
  if (platformId == "jp") return "JP1";
  if (platformId == "kr") return "KR";
  if (platformId == "lan") return "LAN1";
  if (platformId == "las") return "LAS1";
  if (platformId == "na") return "NA1";
  if (platformId == "oc") return "OC1";
  if (platformId == "tr") return "TR1";
  if (platformId == "ru") return "RU";
  else return undefined;
};
