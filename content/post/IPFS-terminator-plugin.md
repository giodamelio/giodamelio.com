+++
categories = ["IPFS", "terminator", "terminal", "terminal-emulator"]
date = "2015-10-20T13:46:24-07:00"
keywords = ["IPFS", "terminator", "terminal", "terminal-emulator", "website", "static"]
title = "IPFS Terminator Plugin"
+++

Here is a simple plugin that allows you to open IPFS/IPNS hashes quickly from inside [Terminator](http://gnometerminator.blogspot.com/p/introduction.html).

## Installation instructions

 1. Make sure you have terminator 0.9 or greater(use `terminator --version` to check)
 2. Download [the plugin](https://gist.githubusercontent.com/giodamelio/4185781d2a36a600555e/raw/3f0b4c5861451ac0274e8e99083d98292a17f3f6/ipfs_urlhandler.py) into `~/.config/terminator/plugins`
 3. **Optional:** Change the variable `SETTINGS["gatewayURL"]`, to a custom gateway(local gateway is `http://localhost:8080/`)
 4. Restart Terminator
 5. Enable Plugin
    1. Right click anywhere and click `Preferences`
    2. Go to the `Plugins` tab
    3. Enable the plugin named `IPFSURLHandler`

You should now be able to right click on any IPFS hash or IPNS url and open it in your browser.

Here is a quick command to test that it is working.

    printf "Qmd924GFkEDmks7r5Rrh3K8mv5S8nE9YFcSn6SbrkodwnE\n/ipfs/QmPvxAyi7V3HBeuYPV3BfkEurowTKRRyQHnGQo8JXLQmrS\n/ipns/QmWGb7PZmLb1TwsMkE1b8jVK4LGceMYMsWaSmviSucWPGG"

## Full source

{{% gist "giodamelio/4185781d2a36a600555e" %}}

