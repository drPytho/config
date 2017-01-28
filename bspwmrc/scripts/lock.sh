#!/bin/bash

cd ~/.config/bspwm/res/

import -window root tmp/sc.png
convert -scale 4% -scale 2500% tmp/sc.png tmp/pix.png
composite -compose atop -gravity center lock.png tmp/pix.png tmp/lock-screen.png

i3lock -i tmp/lock-screen.png -e

