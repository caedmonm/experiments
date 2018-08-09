#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <Servo.h>
#include <time.h>

/* WiFi stuff */
const String SSID = "Over here!"; 
const String Password = "feefifofum";
#define CONNECTION_LED_PIN 2
DynamicJsonBuffer jsonBuffer;

/* Servo stuff */
#define SERVO_PIN 14
#define CENTER_POSITION 90
int currentServoPosition = 0;
Servo myservo;

void SetConnectionLEDOn()
{
   digitalWrite(CONNECTION_LED_PIN, false); 
}

void SetConnectionLEDOff()
{
    digitalWrite(CONNECTION_LED_PIN, true); 
}

void MoveServoToPosition(int position, int speed){
  if(position < currentServoPosition)
  {
    for(int i = currentServoPosition; i > position; i--)
    {
      myservo.write(i);
      delay(speed);
    }
  }
  else if(position > currentServoPosition)
  {
    for(int i = currentServoPosition; i < position; i++)
    {
      myservo.write(i);
      delay(speed);
    }
  }

  currentServoPosition = position;
}

String getJsonHTTP(String host, String url){

    HTTPClient http;
    String payload;

    Serial.print("[HTTP] begin...\n");

    http.begin("http://"+host+url); //HTTP

    Serial.print("[HTTP] GET...\n");
    // start connection and send HTTP header
    int httpCode = http.GET();

    // httpCode will be negative on error
    if(httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if(httpCode == HTTP_CODE_OK) {
            payload = http.getString();
        }
    } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();


    #ifdef PRINT_PAYLOAD
        Serial.println("reply was:");
        Serial.println("==========");
        Serial.println(payload);
        Serial.println("==========");
    #endif
    return payload;
}

void setup() {  
  Serial.begin(115200);
  Serial.println();
  Serial.println("Starting up...");
  pinMode(CONNECTION_LED_PIN, OUTPUT);
  
  SetConnectionLEDOff();
  
  myservo.attach(SERVO_PIN);
  MoveServoToPosition(CENTER_POSITION, 10); // Initialize
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

}

void loop() {
   String json = getJsonHTTP("bigpebbles.co.uk","/experiments/arduino_nm/pos.txt");
   JsonObject& root = jsonBuffer.parseObject(json);
   if (!root.success()) {
    Serial.println("parseObject() failed");
    return;
  }
    Serial.println("json parsed");
    int pos = root["position"];
  
   MoveServoToPosition(pos,10);
   
//   delay(3600000); // 1 hr
  delay(1000); // 10s
}
