from googletrans import Translator as Translator_
import sys
import json

class Translator(object):
    def __init__(self):
        self.translator = Translator_()

    def translate(self,args):
        originalSentence = args['originalSentence']

        targetLanguage = "en" 
        if args['targetLanguage']:
            targetLanguage = args['targetLanguage']

        result = {"targetSentence": "", "originalSentence": originalSentence, "lang":targetLanguage}

        if targetLanguage == "en":
            result['targetSentence'] = self.translator.translate(originalSentence).text
        else:
            result['targetSentence'] = self.translator.translate(originalSentence, dest=targetLanguage).text

        return result