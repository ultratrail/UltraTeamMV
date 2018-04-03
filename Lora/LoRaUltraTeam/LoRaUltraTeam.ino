#include <SPI.h>
#include <LoRa.h>
#include <Wire.h>  
#include <stdint.h>
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
#define INTERVAL  120000; //2minutes

//Creation of the user structure which represent data about one user
typedef struct User User;
struct User{
  uint8_t UID;
  double LatLong;
  bool SOSFlag;
  long lastUpdtateTime; //Last time that the user info has been uptated
  User *next;
};

//Creation of a list of users
typedef struct List List;
struct List{
  User* first;
};



long lastSendTime = 0; //When  the last message has been sent
List* userList = malloc(sizeof(*userList));
userList; //Create a list of users
/**
 * Values that should be obtained via BLE
 */
uint8_t ownerUID = 1234; //User ID
double ownerLatLong; //Geolocation of the user
bool ownerSOSFlag = false; //SOS statement of the user




/**
 * @brief      Initialize a list of users a user information
 *
 * @param      myUID              UID of the user
 * @param      myLatLong          geolocation of the user
 * @param      mySOSFlag          SOS statement of the user
 * @param      mylastUpdtateTime  The mylast updtate time
 *
 * @return     the initialized list
 */
List* initialisation(uint8_t myUID, double myLatLong, bool mySOSFlag, long mylastUpdtateTime){
  List* list = malloc(sizeof(*list));
  List->next = NULL;
  User* user = malloc(sizeof(*user));
  User->UID = myUID;
  User->LatLong = myLatLong;
  User->SOSFlag = mySOSFlag;
  User->lastUpdtateTime = mylastUpdtateTime;
  User->next = NULL;
  liste->first = user;
  return list;
}


/**
 * @brief      Insert a new user at the end of a list of users
 *
 * @param      list     the list of user where the user should be added
 * @param      UID      the user UID
 * @param      LatLong  the user geolocalisation
 * @param      SOSFlag  the user SOS statement
 */
void insertUser(List* list, uint8_t UID, double LatLong, bool SOSFlag){
    //Creation of a new user with the parameters
  User* newUser = malloc(sizeof(*newUser));
  newUser->UID = UID;
  newUser->LatLong = LatLong;
  newUser->SOSFlag = SOSFlag;
  newUser->lastUpdateTime = millis();
  //Put the new user at the end of the users list
  newUser->next = NULL;
  list->first = newUser;
  User* p = malloc(sizeof(*p));
  p = list->first;
  while(p->suivant != NULL){
    p=p->suivant;
  }
  p->next = nouveau;
}


/**
 * @brief      Search a user via its UID in a list of user
 *
 * @param      list  the list of user where the user is searched
 * @param      UID   the user UID
 *
 * @return     a pointer to the user or NULL if the user has not been found
 */
User* findUser(List *list, uint8_t userUID){
  User* p = malloc(sizeof(*p));
  p = list->first;
  while(p != NULL && p->UID != userUID){
    p = p->next;
  }
  return p;
}


/**
 * @brief      Check if someone is sending a SOS
 *
 * @param      list  List of users that are connected
 *
 * @return     List of users that are or sending a SOS
 */
List SOScheck(List *list){
  bool SOS = false;
  List* SOSList = malloc(sizeof(*SOSList));
  User* p = malloc(sizeof(*p));
  p = list->first;
  while(p != NULL && p->SOSFlag == false){
    p = p->next;
  }
  if (p != NULL){
    SOSList = initialisation(p->UID, p->LatLong, p->SOSFlag, millis());
    p = p->next;
    while(p != NULL){
      if(p->SOSFlag){
        insertUser(SOSList, p->UID, p->LatLong, p->SOSFlag);
      }
      p = p->next;
    }
    return SOSList;
  }
  return NULL;
}

/**
 * @brief      Concatenate two lists
 *
 * @param      list1  Initial list
 * @param      list2  List that should be concatenate to the first list
 *
 * @return     { description_of_the_return_value }
 */
List concatList(List *list1, List *list2){
  List* tmp = malloc(sizeof(*tmp));
  tmp = list1;
  User* p = malloc(sizeof(*p));
  p = tmp->first;
  while (p != NULL){
    p = p->next;
  }
  p->next = list2->first;
  return tmp;
}



/**
 * @brief      Set the configuration for LoRa communication
 */
void configForLoRaWAN() {
  LoRa.setTxPower(TXPOWER);
  LoRa.setSpreadingFactor(SPREADING_FACTOR);
  LoRa.setSignalBandwidth(BANDWIDTH);
  LoRa.setCodingRate4(CODING_RATE);
  LoRa.setPreambleLength(PREAMBLE_LENGTH);
  LoRa.setSyncWord(SYNC_WORD);
}



/**
 * @brief      Update the gelocation and / or the SOS statement of a user
 *
 * @param      list     the list of user where the user should be added
 * @param      UID      the user UID
 * @param      LatLong  the user geolocalisation
 * @param      SOSFlag  The sos flag
 */
void updateUserInfo(List *list, uint8_t userUID, double userLatLong, bool userSOSFlag){
  User* p = malloc(sizeof(*p));
  p = findUser(list, userUID);
  p->UID = userUID;
  p->LatLong = userLatLong;
  newUser->SOSFlag = SOSFlag;
  newUser->lastUpdateTime = millis();
}

/**
 * @brief      The 4 following functions convert the given value as an array of char
 *
 * @param      value  The value to convert
 *
 * @return     The converted value as an array of char
 */
unsigned char* uint8_tToBytes(uint8_t value){
  unsigned char tochar[1];
  tochar[0] = value;
  return tochar;
}

unsigned char* intToBytes(int value){
  unsigned char tochar[4];
  tochar[0] = value;
  tochar[1] = value >> 8;
  tochar[2] = value >> 16;
  tochar[3] = value >> 24;
  return tochar;
}

unsigned char* boolToBytes(bool value){
  unsigned char tochar[1];
  tochar[0] = value;
  return tochar;
}

unsigned char* doubleToBytes(double value){
  unsigned char tochar[8];
  tochar[0] = value;
  tochar[1] = value >> 8;
  tochar[2] = value >> 16;
  tochar[3] = value >> 24;
  tochar[4] = value >> 32;
  tochar[5] = value >> 40;
  tochar[6] = value >> 48;
  tochar[7] = value >> 56;
  return tochar;
}

/**
 * @brief      This processus is triggered when a packet is received.It analyzes the packets
 *
 * @param      packetSize  The size of the packet that has been received. Usually LoRa.parsePacket();
 *
 * @return     The list of changes noticed
 */
List onReceive(int packetSize){
  if (packetSize == 0){
    return;          // if there's no packet, return
  }
  char UIDReceived[1];
  char LatLongReceived[8];
  char SOSFlagReceived[1];
  uint8_t UIDParsed;
  double LatLongParsed;
  bool SOSFlagParsed;
  while(packetSize > 0){
    //Receiving UID
    UIDReceived[i] = LoRa.read();
    packetSize--;
    if(packetSize <= 0){
      Serial.println("error, the packet ended too early")
      return;
    }
    //Receiving geolocation
    for(int i=0; i<8; i++){
      LatLongReceived[i] = LoRa.read();
      packetSize--;
      if(packetSize <= 0){
        Serial.println("error, the packet ended too early")
        return;
      }
    }
    //Receiving SOSFlag
    SOSFlagReceived[0] = LoRa.read();
    packetSize--;
    //Converting arrays of char to what we need
    UIDReceived = memcpy(&UIDParsed, UIDReceived, sizeof(UIDParsed));
    LatLongParsed = memcpy(&LatLongParsed, LatLongReceived, sizeof(LatLongParsed));
    SOSFlagParsed = memcpy(&SOSFlagParsed, SOSFlagReceived, sizeof(SOSFlagParsed));

    User* user = malloc(sizeof(*user));
    user = findUser(userList, UIDParsed)
    //If this user is not known, add it to the list
    if(user == NULL){
      insertUser(userList, UIDParsed, LatLongParsed, SOSFlagParsed);
    //Else if this user is sending a SOS
    // Or if his geolocation has changed and had not been uptated recently
    }else if(SOSFlagParsed || (LatLongParsed != (user->LatLong) && (millis()- (user->lastUpdateTime) > INTERVAL))){
      updateUserInfo(userList, UIDParsed, LatLongParsed, SOSFlagParsed);
    }
  }




/**
 * @brief      Method called during the setup. Send information about the embedded card owner
 *
 * @param      user  the embedded card owner
 */
  void firstSend(User* user){
    char UIDsend[2] = uint8_tToBytes(user->UID);
    char LatLongsend[8] = doubleToBytes(user->LatLong);
    char SOSFlagsend[1] = boolToBytes(user->SOSFlag);
  // start packet 
    LoRa.beginPacket();
    for(int i=0; i<2; i++){
      LoRa.write(UIDsend[i]);
    }
    for(int i=0; i<8; i++){
      LoRa.write(LatLongsend[i])
    }
    LoRa.write(SOSFlagsend);
    LoRa.endPacket();     
  }


/**
 * @brief      Create and send a message
 *
 * @param      listToSend  List of user that should have their information sent
 */
  void sendMessage(List* listToSend){
    User* p = list->first;
    char[2] UIDsend
    char[8] LatLongsend 
    char[1] SOSFlagsend 
    Lora.beginPacket();
    while(p != NULL){
      UIDsend = uint8_tToBytes(user->UID);
      LatLongsend = doubleToBytes(user->LatLong);
      SOSFlagsend = boolToBytes(user->SOSFlag);
      for(int i=0; i<2; i++){
        LoRa.write(UIDsend[i]);
      }
      for(int i=0; i<8; i++){
        LoRa.write(LatLongsend[i])
      }
      LoRa.write(SOSFlagsend);
      p = p->next;
    }
    LoRa.endPacket();  
  }


/**
 * HERE YOU SHOULD 
 * -ADD THE BLE SETUP 
 * -SET DATA ABOUT THE OWNER OF THE EMBEDDED CARD OBTAINED VIA BLE
 */
  void setup() {
  // initialize serial
    Serial.begin(115200);                   
    while (!Serial){
      Serial.println("LoRa Duplex");
    }
    configForLoRaWAN();
    SPI.begin(SCK,MISO,MOSI,SS);
  // set CS, reset, IRQ pin
    LoRa.setPins(SS,RST,DI0);
  // initialize ratio at 915 MHz
    if (!LoRa.begin(BAND,PABOOST)) {             
      Serial.println("LoRa init failed. Check your connections.");
    // if failed, do nothing
      while (true);                       
    }
    Serial.println("LoRa init succeeded.");

  //Initialize a list of user
    userList = initialisation(ownerUID, ownerLatLong, ownerSOSFlag, millis());
  //Send the first packet
    firstSend(findUser(userList, ownerUID));

  }

  void loop() {
    int interval = INTERVAL;
  //Initialize the list of what will be sent with the info about the owner of the embedded card
    List* sendList = malloc(sizeof(*sendList));
    sendList = initialisation(ownerUID, ownerLatLong, ownerSOSFlag, millis());
  // parse for a packet, and call onReceive with the result. It returns a List of changes
    List* news = List* list = malloc(sizeof(*news));
    news = onReceive(LoRa.parsePacket());
    sendList = concatList(sendList,news);
    if (SOScheck(userList) != NULL){
      interval = 5000;
      sendList = concatList(sendList, SOScheck(userList));
    }else if (ownerSOSFlag == true){
      interval = 5000;
      if (millis() - lastSendTime > INTERVAL){
        sendMessage(sendList);
        lastSendTime = millis();
      }



    }
