#!/usr/bin/env bash
rm -rf build
yarn build
ssh -t pi@HomeController "sudo rm -rf /home/pi/com/bigboxer23/VeraAutomationHub/2.0.0/public"
scp -r build pi@HomeController:/home/pi/com/bigboxer23/VeraAutomationHub/2.0.0/public