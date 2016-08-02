---
layout: "blog_post.html"
title: "Hosting a Website on IPFS"
author: "Gio d'Amelio"
tags: ["IPFS", "IPNS", "tutorial", "for-future-me"]
date: "2015-09-15T13:10:49-07:00"
keywords: ["IPFS", "IPNS", "website", "tutorial", "static"]
---

This is a quick tutorial that will teach you how to host a simple static website on IPFS, and use IPNS to keep a single id when you change the sites content

## Step 1. Install IPFS

Install IPFS as described at [https://ipfs.io/docs/install/](https://ipfs.io/docs/install/)

## Step 2. Create a simple static site

All you need is a simple static html page, as long as ALL the links are relative. For the purposes of this tutorial I have put a [simple hello world on gist](https://gist.github.com/giodamelio/7f01283fafdffee2ce2e) ([direct download](https://gist.github.com/giodamelio/7f01283fafdffee2ce2e/archive/6c06c2e55e0d1932bfb013f806378e7fee07654b.zip), [view](http://bl.ocks.org/giodamelio/raw/7f01283fafdffee2ce2e/)).

{{ embed.gist("giodamelio", "7f01283fafdffee2ce2e") }}

## Step 3. Add to IPFS

Next you need to add the site to IPFS.

    $ ipfs add -r site/

You should see something like this

    added QmTVJ4XtUhqb6KMW8kxDwArVweACcy7VXAfinEks9Fd8cJ site/index.html
    added QmZL2UBTwnhcLv66fARL9UV8W8a9ZA4iwTLcaUCsB1u1yW site/style.css
    added QmeYxwj4CwCeGVhwi3xLrmBZUUFQdftshSiGLrTdTnWEVV site

The hash on the last line is the root of your site, you can visit is by opening `https://gateway.ipfs.io/ipfs/<your hash here>`. So the example site is at [`https://gateway.ipfs.io/ipfs/QmeYxwj4CwCeGVhwi3xLrmBZUUFQdftshSiGLrTdTnWEVV`](https://gateway.ipfs.io/ipfs/QmeYxwj4CwCeGVhwi3xLrmBZUUFQdftshSiGLrTdTnWEVV)

## Step 4. Publish to IPNS

**Note**: As of the time of this writing, IPNS is unstable and published hashes only persist in the network for 24 hours. You can republish daily with a cronjob, but IPNS is under active development and will hopefully be more stable and longer lasting soon.

Now you have a simple static site hosted on IPFS. The problem is, whenever you update your site, the hash will change, and any links you have shared will continue pointing to the old version. You need a way to always share the latest hash. That's where IPNS comes in. It allows you to store a reference to an IPFS hash under the namespace of your peerID (hash of your public key).

    $ ipfs name publish <your site hash>

That will return your peerID and the hash you are publishing to it. You can confirm by running

    $ ipfs name resolve <peerId>

or by viewing `https://gateway.ipfs.io/ipns/<peerID>` (notice the directory is `ipns` not `ipfs`).

## Step 5. Done

That's it. You're done. Whenever you update your site, just do step 4 again, and IPNS will make sure anyone asking for your peerID gets the hash of your latest site.
