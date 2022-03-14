**************************************
* Assignment - Reinhardt van Rooyen  *
**************************************


***************
*PREREQUISITES*
***************
1. Download and install node (If applicable)
2. Clone the repository to your local machine
3. Navigate to the main folder clearScore and run the following command

npm install

NOTE: This will install all the dependencies needed for the automation test.


**********************************
*How to run the automation script*
**********************************

Visual Studio Code was used to develop the automation script
Screen shots of terminal output provided 
Video of the automation script provided

1. Navigate to the script location

cd .\riseAppTest\

2 Run the following command:

testcafe "chrome: --start-fullscreen --allow-insecure-localhost" --hostname localhost .\riseApp.js --assertion-timeout 700 --selector-timeout 500 --skip-js-errors --speed 0.8

