#include <SPI.h>
#include <WiFi.h>

char ssid[] = "Over here!"; //  your network SSID (name) 
char pass[] = "feefifofum";    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)
int sensorVal = 0;

int status = WL_IDLE_STATUS;
IPAddress server(10,5,5,9);  // numeric IP for Google (no DNS)

WiFiClient client;

void setup() {
  pinMode(8, OUTPUT);
  pinMode(3, INPUT);
  //Initialize serial and wait for port to open:
  Serial.begin(9600); 
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  
  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present"); 
    // don't continue:
    while(true);
  } 
  
  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) { 
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:    
    status = WiFi.begin(ssid, pass);
  
    // wait 10 seconds for connection:
    delay(2000);
  } 
  Serial.println("Connected to wifi");
  printWifiStatus();
}

void loop() {
  sensorVal = analogRead(0);
  Serial.println(sensorVal);
  delay(1000);
}



void printWifiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
