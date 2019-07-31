export default class Utility {
    
  // Turns first char of string to uppercase
  static ucFirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static isset(value: any): boolean {    
    if (typeof value !== "undefined") {
      return true;
    }
    return false;
  }

  static randomPokemonId() {
    // only choose generations with pixel sprites
    return Math.floor(Math.random() * 721 + 1);
  }
}
