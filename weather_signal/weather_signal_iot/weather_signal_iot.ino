
#include "APICalls.h"

#define ACTION_LED_PIN LED_BUILTIN
#define CONNECTION_LED_PIN 2

PaperSignals mySignal;

void setupIndicatorLEDs()
{
    pinMode(ACTION_LED_PIN, OUTPUT);
    pinMode(CONNECTION_LED_PIN, OUTPUT);
}

void SetActionLEDOn()
{
    digitalWrite(ACTION_LED_PIN, false);
}

void SetActionLEDOff()
{
   digitalWrite(ACTION_LED_PIN, true); 
}

void SetConnectionLEDOn()
{
   digitalWrite(CONNECTION_LED_PIN, false); 
}

void SetConnectionLEDOff()
{
    digitalWrite(CONNECTION_LED_PIN, true); 
}

void setup() {

    setupIndicatorLEDs();
    SetActionLEDOn();    
    SetConnectionLEDOff();

    Serial.begin(115200);
    Serial.println();
    Serial.print("connecting to ");
    Serial.println(SSID);

    WiFi.begin(SSID.c_str(), Password.c_str());

    while (WiFi.status() != WL_CONNECTED) {
      delay(250);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    while(WiFi.status() != WL_CONNECTED);
    
    SetConnectionLEDOn();

    mySignal.StartUp();
}

void loop() {
    SetActionLEDOn();

    // wait for WiFi connection
    if(WiFi.status() == WL_CONNECTED) {
        SetConnectionLEDOn();
        mySignal.RunPaperSignals();
    }
    else{
        SetConnectionLEDOff();
    }

    SetActionLEDOff();

    delay(5000);
}




