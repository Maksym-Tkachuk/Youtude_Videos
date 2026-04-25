import type { EmpireMapConfig } from "../empireTypes";

const empires = [
  { id: "british", name: "British Empire", color: "#e74c3c" },
  { id: "french", name: "French Empire", color: "#3498db" },
  { id: "spanish", name: "Spanish Empire", color: "#f39c12" },
  { id: "portuguese", name: "Portuguese Empire", color: "#27ae60" },
  { id: "dutch", name: "Dutch Empire", color: "#e67e22" },
  { id: "ottoman", name: "Ottoman Empire", color: "#1abc9c" },
  { id: "russian", name: "Russian Empire", color: "#9b59b6" },
];

// countrySlug → year → empireId ("" = independent)
const territories: Record<string, Record<number, string>> = {
  // ───────── BRITISH EMPIRE ─────────

  // Ireland — English control solidified in 1600s, independence 1922
  ireland: { 1700: "british", 1922: "" },

  // North America
  usa: { 1707: "british", 1776: "" },
  canada: { 1763: "british", 1931: "" },
  belize: { 1798: "british", 1981: "" },

  // Caribbean
  jamaica: { 1655: "british", 1962: "" },
  barbados: { 1627: "british", 1966: "" },
  bahamas: { 1718: "british", 1973: "" },
  trinidad: { 1797: "british", 1962: "" },
  guyana: { 1814: "british", 1966: "" },

  // South Asia
  india: { 1757: "british", 1947: "" },
  pakistan: { 1757: "british", 1947: "" },
  bangladesh: { 1757: "british", 1947: "" },
  sri_lanka: { 1815: "british", 1948: "" },
  myanmar: { 1824: "british", 1948: "" },
  nepal: { 1816: "british", 1923: "" },

  // Southeast Asia
  malaysia: { 1824: "british", 1957: "" },
  singapore: { 1819: "british", 1965: "" },
  brunei: { 1888: "british", 1984: "" },
  hong_kong: { 1842: "british", 1997: "" },

  // Oceania
  australia: { 1788: "british", 1931: "" },
  new_zealand: { 1840: "british", 1931: "" },
  fiji: { 1874: "british", 1970: "" },
  papua_new_guinea: { 1884: "british", 1975: "" },

  // Africa — East
  egypt: { 1882: "british", 1922: "" },
  sudan: { 1899: "british", 1956: "" },
  kenya: { 1895: "british", 1963: "" },
  uganda: { 1894: "british", 1962: "" },
  tanzania: { 1919: "british", 1961: "" },
  somalia: { 1884: "british", 1960: "" },
  mauritius: { 1810: "british", 1968: "" },

  // Africa — Southern
  south_africa: { 1806: "british", 1931: "" },
  zimbabwe: { 1888: "british", 1980: "" },
  zambia: { 1891: "british", 1964: "" },
  malawi: { 1891: "british", 1964: "" },
  botswana: { 1885: "british", 1966: "" },
  namibia: { 1915: "british", 1990: "" },

  // Africa — West
  nigeria: { 1861: "british", 1960: "" },
  ghana: { 1821: "british", 1957: "" },
  sierra_leone: { 1808: "british", 1961: "" },
  gambia: { 1821: "british", 1965: "" },

  // Mediterranean
  cyprus: { 1878: "british", 1960: "" },
  malta: { 1800: "british", 1964: "" },

  // Middle East
  iraq: { 1920: "british", 1932: "" },
  jordan: { 1920: "british", 1946: "" },
  israel: { 1920: "british", 1948: "" },
  kuwait: { 1899: "british", 1961: "" },
  uae: { 1892: "british", 1971: "" },
  bahrain: { 1861: "british", 1971: "" },
  qatar: { 1916: "british", 1971: "" },
  oman: { 1891: "british", 1971: "" },
  yemen: { 1839: "british", 1967: "" },

  // ───────── FRENCH EMPIRE ─────────

  algeria: { 1830: "french", 1962: "" },
  vietnam: { 1887: "french", 1954: "" },
  cambodia: { 1863: "french", 1953: "" },
  laos: { 1893: "french", 1953: "" },
  morocco: { 1912: "french", 1956: "" },
  senegal: { 1817: "french", 1960: "" },
  mali: { 1892: "french", 1960: "" },
  niger: { 1900: "french", 1960: "" },
  chad: { 1900: "french", 1960: "" },
  madagascar: { 1896: "french", 1960: "" },
  ivory_coast: { 1893: "french", 1960: "" },
  guinea: { 1891: "french", 1958: "" },
  cameroon: { 1919: "french", 1960: "" },
  congo: { 1880: "french", 1960: "" },
  gabon: { 1839: "french", 1960: "" },
  djibouti: { 1884: "french", 1977: "" },

  // ───────── SPANISH EMPIRE ─────────

  mexico: { 1700: "spanish", 1821: "" },
  cuba: { 1700: "spanish", 1898: "" },
  philippines: { 1700: "spanish", 1898: "" },
  peru: { 1700: "spanish", 1824: "" },
  colombia: { 1700: "spanish", 1819: "" },
  venezuela: { 1700: "spanish", 1811: "" },
  argentina: { 1700: "spanish", 1816: "" },
  chile: { 1700: "spanish", 1818: "" },

  // ───────── PORTUGUESE EMPIRE ─────────

  brazil: { 1700: "portuguese", 1822: "" },
  angola: { 1700: "portuguese", 1975: "" },
  mozambique: { 1700: "portuguese", 1975: "" },

  // ───────── DUTCH EMPIRE ─────────

  indonesia: { 1700: "dutch", 1949: "" },
  suriname: { 1700: "dutch", 1975: "" },

  // ───────── OTTOMAN EMPIRE ─────────

  turkey: { 1700: "ottoman", 1922: "" },
  libya: { 1700: "ottoman", 1912: "" },
  syria: { 1700: "ottoman", 1918: "" },

  // ───────── RUSSIAN EMPIRE ─────────

  kazakhstan: { 1700: "russian", 1991: "" },
  uzbekistan: { 1700: "russian", 1991: "" },
  finland: { 1809: "russian", 1917: "" },
  poland: { 1795: "russian", 1918: "" },
  georgia: { 1801: "russian", 1918: "" },
  armenia: { 1828: "russian", 1918: "" },
  azerbaijan: { 1828: "russian", 1918: "" },
  ukraine: { 1700: "russian", 1918: "" },
  belarus: { 1700: "russian", 1918: "" },
  lithuania: { 1795: "russian", 1918: "" },
  latvia: { 1795: "russian", 1918: "" },
  estonia: { 1710: "russian", 1918: "" },
};

export const BRITISH_EMPIRE_CONFIG: EmpireMapConfig = {
  empires,
  territories,
  title: "RISE AND FALL OF THE",
  subtitle: "BRITISH EMPIRE",
  startYear: 1700,
  endYear: 1997,
  framesPerYear: 4,
  targetDuration: 45000,
  events: {
    1776: "American colonies declare independence — Britain loses its first major territory",
    1858: "British Crown takes direct control of India — the jewel of the empire",
    1947: "India and Pakistan gain independence — the beginning of the end for the British Empire",
    1997: "Hong Kong is returned to China — the last major handover, marking the empire's final chapter",
  },
  sourceLabel: "Data: Historical records, Cambridge History of the British Empire",
};
