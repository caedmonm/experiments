#include <Arduino.h>
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <Servo.h>
#include <time.h>
#include "Credentials.h"

#define SERVO_PIN 14

// Servo Positions and Intent specific Numbers

#define CENTER_POSITION 90

class PaperSignals
{
public:
  PaperSignals() {};
  ~PaperSignals() {};

  void StartUp();
  String getJson(String host, String url);
  String getJsonHTTP(String host, String url);
  void RunPaperSignals();

public:

  // Use WiFiClientSecure class to create TLS connection
  WiFiClientSecure client;
  const int httpsPort = 443;

  // Functions
  String GetWeather(String JSONData);
  String GetLatLong(String JSONData);

  void MoveServoToPosition(int position, int speed);

  int lastTimerTime = 0;

  unsigned long breakTimeLength = 60000; // 1 Minute Default
  unsigned long breakTimeInterval = 900000; // 15 Minute Default
  unsigned long lastBreakTime = 0;

  int numTestServoSwings = 0;

  String mostRecentDateString = "";

  Servo myservo;
  int currentServoPosition = 0;
};
