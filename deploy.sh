#!/usr/bin/env bash
rm -rf build
yarn build
ssh -t pi@homecontroller "sudo rm -rf /home/pi/com/bigboxer23/VeraAutomationHub/2.0.0/public"
scp -r build pi@homecontroller:/home/pi/com/bigboxer23/VeraAutomationHub/2.0.0/public