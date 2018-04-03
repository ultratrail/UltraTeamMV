import aesjs from 'aes-js';
/**
 * AES class. Used for AES encryption.
 *
 * @class      AES (name)
 */
export class AES {

  /**
   * Build an AES. If no Key or IV is supplied, it will be picked randomly.
   *
   * @return     {<type>}  { Built AES }
   */
  constructor(
    private key?: number[],
    private iv?: number[]
   ) {
     if(this.key == null){
       this.key = this.random128();
     }
     else{
      this.key = key;
     }
     if(this.iv == null){
       this.iv = this.random128();
     }
     else{
      this.iv = iv;
     }

  }

  /**
   * Gets the AES key.
   *
   * @return     {<type>}  The AES' key.
   */
  public getKey() {
    return this.key;
  }

  /**
   * Gets the AES IV.
   *
   * @return     {<type>}  The AES' IV.
   */
  public getIV() {
    return this.iv;
  }

  /**
   * Returns a number array of length 16 of random number from 0 to 16. 
   *
   * @return     {<type>}  { The resulting array }
   */
  public random128(): number[] {
    var arr: number[] = new Array(16);
    for (var i = 0; i < 16; i++) {
      arr[i] = Math.floor(Math.random() * 16);
    }
    return arr;
  }

  /**
   * Encrypts given string with AES Key & IV. 
   *
   * @param      {<type>}  str     The string
   * @return     {<type>}  { The encrypted data }
   */
  public encrypt(str: string):any {

    var textBytes = aesjs.utils.utf8.toBytes(str);

    var aesOfb = new aesjs.ModeOfOperation.ofb(this.key, this.iv);
    var encryptedBytes = aesOfb.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;

  }

  /**
   * Decrypts given data into a string with AES Key & IV. `Encrypt` inverse function.
   *
   * @param      {<type>}  data    The data to be decrypted
   * @return     {<type>}  { The decrypted result as a string }
   */
  public decrypt(data: any): string {

    var encryptedBytes = aesjs.utils.hex.toBytes(data);

    // The output feedback mode of operation maintains internal state,
    // so to decrypt a new instance must be instantiated.
    var aesOfb = new aesjs.ModeOfOperation.ofb(this.key, this.iv);
    var decryptedBytes = aesOfb.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
    // "Text may be any length you wish, no padding is required."
  }

}
