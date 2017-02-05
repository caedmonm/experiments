#include <Servo.h>

Servo s1; 
int dir = 0;
int soundDetectedPin = 10; // Use Pin 10 as our Input
int soundDetectedVal = HIGH; // This is where we record our Sound Measurement
boolean bAlarm = false;

unsigned long lastSoundDetectTime; // Record the time that we measured a sound


int soundAlarmTime = 2000; // Number of milli seconds to keep the sound alarm high


void setup ()
{
  Serial.begin(9600);  
  pinMode (soundDetectedPin, INPUT) ; // input from the Sound Detection Module
  s1.attach(9);
}
void loop ()
{
  soundDetectedVal = digitalRead (soundDetectedPin) ; // read the sound alarm time
  
  if (soundDetectedVal == LOW) // If we hear a sound
  {
  
    lastSoundDetectTime = millis(); // record the time of the sound alarm
    // The following is so you don't scroll on the output screen
    if (!bAlarm){
      
      if(dir==1){
        Serial.println("go to 180");
        s1.write(180);
        delay(2000);
        dir = 0;
      } else {
        Serial.println("go to 0");
        s1.write(0);
        delay(2000);
        dir = 1;
      }
      
      bAlarm = true;
    }
  }
  else
  {
    if( (millis()-lastSoundDetectTime) > soundAlarmTime  &&  bAlarm){
      Serial.println("stop");
      bAlarm = false;
    }
  }
}
