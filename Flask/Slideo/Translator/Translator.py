from googletrans import Translator as Translator_
import sys
import json

class Translator(object):
    def __init__(self):
        self.translator = Translator_()

    def translate(self,args):
        if 'sentence' in args:
            sentences = args['sentence']
        elif 'sentences' in args:
            sentences = args['sentences']

        target_language = "en"
        if 'target_language' in args:
            if args['target_language']:
                target_language = args['target_language']

        if target_language == "en":
            translations = self.translator.translate(sentences)
        else:
            translations = self.translator.translate(sentences, dest=target_language)

        if type(sentences) == list:
            return [translation.__dict__ for translation in translations]
        else:
            return translations.__dict__
