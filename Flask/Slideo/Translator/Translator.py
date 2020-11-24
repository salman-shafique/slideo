import sys
import json
from google.cloud import translate_v2


class Translator(object):
    def __init__(self):
        self.translator = translate_v2.Client()

    def translate(self,args):
        if 'sentence' in args:
            sentences = args['sentence']
        elif 'sentences' in args:
            sentences = args['sentences']

        target_language = "en"
        if 'target_language' in args:
            if args['target_language']:
                target_language = args['target_language']

        source_language = None
        if 'source_language' in args:
            if args['source_language']:
                source_language = args['source_language']

        translations = self.translator.translate(sentences, target_language=target_language, source_language=source_language)

        return translations
