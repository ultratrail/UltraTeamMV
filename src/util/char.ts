/**
 * Character manipulation module.
 */
export module Char {

  /**
   * Returns the letter (as string of length 1) corresponding to given number
   *
   * @param      {<type>}  n       { Number (between 0 and 25) }
   * @return     {<type>}  { Corresponding char }
   */
  export function intToChar(n: number) {
    return String.fromCharCode(n + 97);
  }

  /**
   * Returns the integer corresponding to the given char (first of the string) 
   *
   * @param      {<type>}  s       String to be translated
   * @return     {<type>}  { Corresponding integer }
   */
  export function charToInt(s: string):number {
    // if (s.length != 0) {
    //   throw new Error("string length > 1");
    // }
    return s.charCodeAt(0)-97;
  }

  /**
   * Returns the string built by joining (with given separator) the number entries of given array translated to corresponding characters
   *
   * @param      {<type>}  arr     The number array to translate to string
   * @param      {<type>}  sep     The chararcters separator in resulting string
   * @return     {<type>}  { The built string }
   */
  export function numberArrayToCharCode(arr: number[], sep: string):string {
    return arr.map(Char.intToChar).join(sep);
  }

  /**
   * Returns the number array built from getting corresponding int of every char of given string.
   *
   * @param      {<type>}  str     The string to build array from.
   * @return     {<type>}  { The built number array }
   */
  export function charCodeToNumberArray(str:string):number[] {
    return Array.from(str).map(charToInt);
  }

}
