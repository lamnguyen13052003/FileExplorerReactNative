export class Color {
  red: number;
  green: number;
  blue: number;
  opacity: number;

  constructor(red: number, green: number, blue: number, opacity: number = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
  }

  setOpacity(opacity: number) {
    return new Color(this.red, this.green, this.blue, opacity);
  }

  getColor() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
  }
}

const primaryColor = new Color(13, 110, 253);
const secondaryColor = new Color(108, 117, 125);
const successColor = new Color(25, 135, 84);
const dangerColor = new Color(220, 53, 69);
const warningColor = new Color(255, 193, 7);
const infoColor = new Color(13, 202, 240);
const lightColor = new Color(248, 249, 250);
const darkColor = new Color(33, 37, 41);

export type Theme = "light" | "dark";

class BootstrapColors {
  private theme: Theme = "light";

  primary: Color;
  secondary: Color;
  success: Color;
  danger: Color;
  warning: Color;
  info: Color;
  light: Color;
  dark: Color;

constructor() {
  // this.setTheme("light");
  this.primary = primaryColor;
  this.secondary = secondaryColor;
  this.success = successColor;
  this.danger = dangerColor;
  this.warning = warningColor;
  this.info = infoColor;
  this.light = lightColor;
  this.dark = darkColor;
}

  setTheme(theme: Theme) {
    this.theme = theme;
    if (theme === "light") {
      this.primary = primaryColor;
      this.secondary = secondaryColor;
      this.success = successColor;
      this.danger = dangerColor;
      this.warning = warningColor;
      this.info = infoColor;
      this.light = lightColor;
      this.dark = darkColor;
    } else {
      this.primary = primaryColor;
      this.secondary = secondaryColor;
      this.success = successColor;
      this.danger = dangerColor;
      this.warning = warningColor;
      this.info = infoColor;
      this.light = darkColor;
      this.dark = lightColor;

    }
  }
}

const bootstrapColors = new BootstrapColors();
export default bootstrapColors;
