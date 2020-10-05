# -*- coding: utf-8 -*-
import Pyro4
import spacy
from spacy import displacy
import os
import shutil
from googletrans import Translator
import string
import subprocess
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.lang import MSO_LANGUAGE_ID
from PIL import Image, ImageEnhance
import copy
import six
import argparse
import json
import requests
from requests_oauthlib import OAuth1
import urllib.request
import time
import base64
import unicodedata as UD
from io import BytesIO
import mysql.connector


class NLP(object):
    def __init__(self):
        self.nlp = spacy.load('en_core_web_sm')

    def get_html(self, sentence, options={"collapse_phrases": False}):
        doc = self.nlp(sentence)
        html = displacy.render([doc], style="dep", page=True, options=options)
        return html

    def get_sentenceDic(self, sentence, options={"collapse_phrases": False}):
        doc = self.nlp(sentence)
        sentenceDic = displacy.parse_deps(doc, options=options)
        return sentenceDic

    def get_tokens(self, text):
        doc = self.nlp(text)
        all_tokens = []
        for token in doc:
            one_token = {}
            one_token['text'] = token.text
            one_token['lemma'] = token.lemma_
            one_token['pos'] = token.pos_
            one_token['tag'] = token.tag_
            one_token['dep'] = token.dep_
            one_token['ent_type'] = token.ent_type_
            one_token['shape'] = token.shape_
            one_token['is_alpha'] = token.is_alpha
            one_token['is_stop'] = token.is_stop
            one_token['idx'] = token.idx
            all_tokens.append(one_token)
        return all_tokens