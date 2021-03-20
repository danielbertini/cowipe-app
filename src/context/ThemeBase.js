import { normal } from '../config/themeNormal';
import { dark } from '../config/themeDark';

const themes = { normal, dark };

export default function getTheme(theme) {
  return themes[theme]
};