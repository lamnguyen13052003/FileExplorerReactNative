const primary = "rgb(13, 110, 253)";
const secondary = "rgb(108, 117, 125)";
const success = "rgb(25, 135, 84)";
const danger = "rgb(220, 53, 69)";
const warning = "rgb(255, 193, 7)";
const info = "rgb(13, 202, 240)";
const light = "rgb(248, 249, 250)";
const dark = "rgb(33, 37, 41)";

class BootstrapColors {
  primary = new Color(13, 110, 253);
  secondary = new Color(108, 117, 125);
  success = new Color(25, 135, 84);
  danger = new Color(220, 53, 69);
  warning = new Color(255, 193, 7);
  info = new Color(13, 202, 240);
  light = new Color(248, 249, 250);
  dark = new Color(33, 37, 41);
}

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

const bootstrapColors = new BootstrapColors();
export default bootstrapColors;

export {
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  light,
  dark
};
