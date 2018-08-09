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

/* Servo stuff */
#define SERVO_PIN 14
#define CENTER_POSITION 90
int currentServoPosition = 0;
Servo myservo;
int incomingByte = 0; 
int targetServoPos = 90;

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
   if (Serial.available() > 0) {
    incomingByte = Serial.read();
    incomingByte = incomingByte;
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);

    if(incomingByte==48){
      targetServoPos -= 5;
    } else {
      targetServoPos += 5;
    }

    if(targetServoPos>180){
      targetServoPos = 180;
    }
    if(targetServoPos<0){
      targetServoPos= 0;
    }
    
    MoveServoToPosition(targetServoPos, 20);
   }
//  delay(1000);
}
