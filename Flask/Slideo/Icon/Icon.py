#!/usr/bin/env python
# -*- coding: utf-8 -*-
import numpy as np
from PIL import Image
import urllib.request
import os
from .. import env
from requests_oauthlib import OAuth1
import json
import requests


class Icon(object):
    def __init__(self):
        self.auth = OAuth1(env.THENOUNPROJECT_KEY,env.THENOUNPROJECT_SECRET)


    def find_icons(self,args):
        if not 'limit' in args:
            args['limit'] = 100
        if not 'limit_to_public_domain' in args:
            args['limit_to_public_domain'] = 0
        
        endpoint = "http://api.thenounproject.com/icons/{}?limit={}&limit_to_public_domain={}".format(
            args['keyword'],
            args['limit'],
            args['limit_to_public_domain']
        )

        return json.loads(requests.get(endpoint, auth=self.auth).text)



    def change_color(self, args):
        icons = args["icons"]
        rgb = args["rgb"]

        r = rgb[0]
        g = rgb[1]
        b = rgb[2]
        colorName = "({},{},{})".format(r, g, b)

        masterResult = []
        for icon in icons:
            iconName = icon["icon_path"].split("/")[-1]
            blackIconFolder = env.PUBLIC_PATH + "/icons/" + iconName + "/(0,0,0)/"
            if not os.path.exists(blackIconFolder):
                os.makedirs(blackIconFolder, exist_ok=True)
                # Download the icon
                urllib.request.urlretrieve(
                    icon["icon_path"], blackIconFolder + iconName
                )

            # Existing icon
            coloredIconFolder = (
                env.PUBLIC_PATH + "/icons/" + iconName + "/" + colorName + "/"
            )

            if os.path.exists(coloredIconFolder + iconName):
                result = {
                    "coloredIconPath": coloredIconFolder.replace( env.PUBLIC_PATH, "")
                    + iconName
                }
                masterResult.append(result)
                continue

            os.makedirs(coloredIconFolder, exist_ok=True)

            im = Image.open(blackIconFolder + iconName)
            im = im.convert("RGBA")
            pixdata = im.load()
            for x in range(0, im.size[0]):
                for y in range(0, im.size[1]):
                    rdelta = pixdata[x, y][0] - 0
                    gdelta = pixdata[x, y][0] - 0
                    bdelta = pixdata[x, y][0] - 0
                    if abs(rdelta) <= 15 and abs(gdelta) <= 15 and abs(bdelta) <= 15:
                        pixdata[x, y] = (
                            int(r) + rdelta,
                            int(g) + gdelta,
                            int(b) + bdelta,
                            pixdata[x, y][3],
                        )

            im.save(coloredIconFolder + iconName)

            result = {
                "coloredIconPath": coloredIconFolder.replace(env.PUBLIC_PATH, "") + iconName
            }
            masterResult.append(result)

        return masterResult
