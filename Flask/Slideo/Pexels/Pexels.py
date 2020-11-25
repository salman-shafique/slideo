#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .. import env
import json
import requests
from ..Translator import Translator


class Pexels(object):
    def __init__(self):
        self.translator = Translator.Translator()

    def image_call(self, keyword, per_page):
        endpoint = "https://api.pexels.com/v1/search?query={}&per_page={}".format(
            keyword,
            per_page,
        )
        headers = {"Authorization": env.PEXELS_API_KEY}
        return requests.get(endpoint, headers=headers)

    def simplify_photos(self, photos):
        tmp = []
        for photo in photos:
            photo["url"] = photo["src"]["original"]
            del photo["src"]
            del photo["photographer_id"]
            del photo["liked"]
            tmp.append(photo)
        return tmp

    def find_images(self, args):
        if not "per_page" in args:
            args["per_page"] = 20

        response = json.loads(self.image_call(args["keyword"], args["per_page"]).text)

        if response["total_results"] > 0:
            return self.simplify_photos(response["photos"])
        else:
            # Translate
            translated_keyword = self.translator.translate(
                {"sentence": args["keyword"]}
            )["translatedText"]
            response = json.loads(
                self.image_call(translated_keyword, args["per_page"]).text
            )
            if response["total_results"] > 0:
                return self.simplify_photos(response["photos"])
            else:
                return [{
                        "height": 6123,
                        "id": 4439465,
                        "photographer": "Vie Studio",
                        "photographer_url": "https://www.pexels.com/@vie-studio",
                        "url": "https://images.pexels.com/photos/4439465/pexels-photo-4439465.jpeg",
                        "width": 4082,
                        }]
