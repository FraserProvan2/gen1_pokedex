export default class  Utility {

    // Turns first char of string to uppercase
    static ucFirst(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}