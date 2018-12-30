#!/usr/bin/env bash
rm -rf build
yarn build
ssh -t pi@homecontroller -o StrictHostKeyChecking=no "sudo rm -rf /home/pi/com/bigboxer23/VeraAutomationHub/2.0.0/public"
scp -o StrictHostKeyChecking=no -r build pi@homecontroller:/home/pi/com/bigboxer23/VeraAutomationHub/2.0.0/public