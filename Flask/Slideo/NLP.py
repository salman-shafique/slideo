# -*- coding: utf-8 -*-
import spacy
from spacy import displacy


class NLP(object):
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def get_html(self, args):

        doc = self.nlp(args["text"])

        if not "options" in args:
            args["options"] = {"collapse_phrases": False}
        elif not args["options"]: 
            args["options"] = {"collapse_phrases": False}

        html = displacy.render([doc], style="dep", page=True, options=args["options"])
        return {"html": html}

    def get_sentence_dictionary(self,args):
        doc = self.nlp(args["text"])

        if not "options" in args:
            args["options"] = {"collapse_phrases": False}
        elif not args["options"]: 
            args["options"] = {"collapse_phrases": False}

        sentence_dictionary = displacy.parse_deps(doc, options=args["options"])
        return {'sentence_dictionary':sentence_dictionary}

    def get_tokens(self, args):
        doc = self.nlp(args['text'])
        all_tokens = []
        for token in doc:
            one_token = {}
            one_token["text"] = token.text
            one_token["lemma"] = token.lemma_
            one_token["pos"] = token.pos_
            one_token["tag"] = token.tag_
            one_token["dep"] = token.dep_
            one_token["ent_type"] = token.ent_type_
            one_token["shape"] = token.shape_
            one_token["is_alpha"] = token.is_alpha
            one_token["is_stop"] = token.is_stop
            one_token["idx"] = token.idx
            all_tokens.append(one_token)
            
        return {'tokens':all_tokens}