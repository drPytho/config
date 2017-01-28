#!/bin/sh
node ~/.config/bspwm/scripts/lemonbar/index.js &

until bar_id=$(xdo id -a mybar)
do
  sleep 0.001
done

xdo below -t $(xdo id -n root) $bar_id &

