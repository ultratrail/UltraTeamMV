#include <SPI.h>
#include <LoRa.h>
#include <Wire.h>  
#include "SSD1306.h" 

// Pin definetion of WIFI LoRa 32
// HelTec AutoMation 2017 support@heltec.cn 
#define SCK     5    // GPIO5  -- SX127x's SCK
#define MISO    19   // GPIO19 -- SX127x's MISO
#define MOSI    27   // GPIO27 -- SX127x's MOSI
#define SS      18   // GPIO18 -- SX127x's CS
#define RST     14   // GPIO14 -- SX127x's RESET
#define DI0    26   // GPIO26 -- SX127x's IRQ(Interrupt Request)
#define BAND 868100000

// LoRaWAN CONFIGURATION
#define PABOOST false
#define TXPOWER 14
#define SPREADING_FACTOR 12
#define BANDWIDTH 125000
#define CODING_RATE 5
#define PREAMBLE_LENGTH 8
#define SYNC_WORD 0x34


//String outgoing; // outgoing message
//byte msgCount = 0;            // count of outgoing messages
//long lastSendTime = 0;        // last send time
int interval = 2000; // interval between sends
//byte localAddress = 0xBB;     // address of this device
//byte destination = 0xFF; // destination to send to
int myUID = 1234;
double myLatLong = 1234567890;


typedef struct User User;
struct User{
    short UID;
    double LatLong;
    bool SOSflag;
    long lastSendTime;
    User *suivant;
};

typedef struct Liste Liste;
struct Liste{
    User *premier;
};

void configForLoRaWAN()
{
  LoRa.setTxPower(TXPOWER);
  LoRa.setSpreadingFactor(SPREADING_FACTOR);
  LoRa.setSignalBandwidth(BANDWIDTH);
  LoRa.setCodingRate4(CODING_RATE);
  LoRa.setPreambleLength(PREAMBLE_LENGTH);
  LoRa.setSyncWord(SYNC_WORD);
}

void setup() {
  Serial.begin(115200);                   // initialize serial
  while (!Serial);
  Serial.println("LoRa Duplex");
  configForLoRaWAN();
  SPI.begin(SCK,MISO,MOSI,SS);
  LoRa.setPins(SS,RST,DI0);// set CS, reset, IRQ pin

  if (!LoRa.begin(BAND,PABOOST))
  {             // initialize ratio at 915 MHz
    Serial.println("LoRa init failed. Check your connections.");
    while (true);                       // if failed, do nothing
  }

  Serial.println("LoRa init succeeded.");
  initialisation();
}

void loop() {
  // put your main code here, to run repeatedly:
  if (millis() - lastSendTime > interval)
  {
    String message = "Hello,I'm coming!";   // send a message
    sendMessage(message);
    Serial.println("Sending " + message);
    lastSendTime = millis(); // timestamp the message
  }
    // parse for a packet, and call onReceive with the result:
  onReceive(LoRa.parsePacket());
}


void sendMessage(String outgoing)
{
  LoRa.beginPacket();                   // start packet 
  LoRa.write(destination);              // add destination address
  LoRa.write(localAddress);             // add sender address
  LoRa.write(msgCount);                 // add message ID
  LoRa.write(outgoing.length());        // add payload length        
  LoRa.print(outgoing);                 // add payload
  LoRa.endPacket();                     // finish packet and send it
  msgCount++;                           // increment message ID
}

void onReceive(int packetSize)
{ 
  if (packetSize == 0){
    return;          // if there's no packet, return
  }

//  read packet header bytes:
  int recipient = LoRa.read();          // recipient address
  byte sender = LoRa.read();            // sender address
  byte incomingMsgId = LoRa.read();     // incoming msg ID
  byte incomingLength = LoRa.read();    // incoming msg length

  String incoming = "";

  while (LoRa.available())
  {
    incoming += (char)LoRa.read();
  }

  if (incomingLength != incoming.length())
  {   // check length for error
    Serial.println("error: message length does not match length");
    return;                             // skip rest of function
  }

  // if the recipient isn't this device or broadcast,
  if (recipient != localAddress && recipient != 0xFF) {
    Serial.println("This message is not for me.");
    return;                             // skip rest of function
  }

  // if message is for this device, or broadcast, print details:
  Serial.println("Received from: 0x" + String(sender, HEX));
  Serial.println("Sent to: 0x" + String(recipient, HEX));
  Serial.println("Message ID: " + String(incomingMsgId));
  Serial.println("Message length: " + String(incomingLength));
  Serial.println("Message: " + incoming);
  Serial.println("RSSI: " + String(LoRa.packetRssi()));
  Serial.println("Snr: " + String(LoRa.packetSnr()));
  Serial.println();
}

Liste *initialisation(){
    Liste *liste = malloc(sizeof(*liste));
    User *user = malloc(sizeof(*user));
    User->UID = myUID;
    User->LatLong = myLatLong;
    User->SOSflag = 0;
    User->lastSendTime = millis();
    User->suivant = NULL;
    liste->premier = user;
    return liste;
}

void insertion(Liste *liste, int UID, double LatLong, int SOSflag, char* pseudo){
    /* Création du nouvel élément */
    User *nouveau = malloc(sizeof(*nouveau));
    nouveau->UID = UID;
    nouveau->LatLong = LatLong;
    nouveau->SOSflag = SOSflag;
    nouveau->lastSendTime = millis();
    /* Insertion de l'élément en fin de liste */
    nouveau->suivant = NULL;
    liste->premier = nouveau;
    User *p=liste->premier;
    while(p->suivant!=NULL){
        p=p->suivant;
    }
    p->suivant = nouveau;
}

void firstSend(User *user){
                    
}



std::vector<unsigned char> intToBytes(int value){
    std::vector<unsigned char> result;
    result.push_back(value >> 24);
    result.push_back(value >> 16);
    result.push_back(value >>  8);
    result.push_back(value      );
    return result;
}




