# -*- coding: utf-8 -*-
import spacy
from spacy import displacy
from . import Algorithm
from . import PrepareSlides
from ..Translator import Translator


class NLP(object):
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")
        self.translator = Translator.Translator()

    def get_html(self, args):

        doc = self.nlp(args["text"])

        if not "options" in args:
            args["options"] = {"collapse_phrases": False}
        elif not args["options"]:
            args["options"] = {"collapse_phrases": False}

        html = displacy.render([doc], style="dep", page=True, options=args["options"])
        return {"html": html}

    def get_sentence_dictionary(self, args):
        doc = self.nlp(args["text"])

        if not "options" in args:
            args["options"] = {"collapse_phrases": False}
        elif not args["options"]:
            args["options"] = {"collapse_phrases": False}

        sentence_dictionary = displacy.parse_deps(doc, options=args["options"])
        return {"sentence_dictionary": sentence_dictionary}

    def get_tokens(self, args):
        doc = self.nlp(args["text"])
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

        return {"tokens": all_tokens}

    def analyze(self, args):
        sentences = args["sentences"]

        options = {
            "collapse_phrases": False,
            "collapse_punct": False,
        }
        if "collapse_phrases" in args:
            options.update({"collapse_phrases": True})
        if "collapse_punct" in args:
            options.update({"collapse_punct": True})

        splitted_sentences = Algorithm.split_sentences(sentences)
        translated_sentences = self.translator.translate(
            {"sentences": splitted_sentences}
        )

        groupped_sentences = []
        for translation in translated_sentences:
            groupped_sentence = {
                "originalSentence": translation["origin"],
                "englishSentence": translation["text"],
                "lang": translation["src"],
                "tokens": Algorithm.calculate_total(
                    self.get_tokens({"text": translation["text"]})["tokens"]
                ),
                "sentence_dictionary": self.get_sentence_dictionary(
                    {"text": translation["text"], "options": options}
                )["sentence_dictionary"],
            }
            groupped_sentences.append(groupped_sentence)

        analyzed_sentences = Algorithm.analyze(groupped_sentences)

        # Translate back h1s
        result = []
        for groupped_sentence in analyzed_sentences:
            # Translation
            if groupped_sentence["englishH1s"]:
                if groupped_sentence["lang"] != "en":
                    translations = self.translator.translate(
                        {
                            "sentences": groupped_sentence["englishH1s"],
                            "target_language": groupped_sentence["lang"],
                        }
                    )
                    originalH1s = []
                    for translation in translations:
                        originalH1s.append(translation["text"])
                    groupped_sentence["originalH1s"] = originalH1s
                else:
                    groupped_sentence["originalH1s"] = groupped_sentence["englishH1s"]

            if groupped_sentence["not_ruled_words_english"]:
                if groupped_sentence["lang"] != "en":
                    translations = self.translator.translate(
                        {
                            "sentences": groupped_sentence["not_ruled_words_english"],
                            "target_language": groupped_sentence["lang"],
                        }
                    )
                    not_ruled_words_original = []
                    for translation in translations:
                        not_ruled_words_original.append(translation["text"])
                    groupped_sentence[
                        "not_ruled_words_original"
                    ] = not_ruled_words_original
                else:
                    groupped_sentence["not_ruled_words_original"] = groupped_sentence[
                        "not_ruled_words_english"
                    ]
            result.append(groupped_sentence)

        return result

    def extract_keyword(self,args):
        text = args['text']
        anaylzed_text = self.analyze({'sentences':[text]})
        if anaylzed_text[0]:
            if anaylzed_text[0]['keywords'][0]:
                return {
                    'keyword':anaylzed_text[0]['keywords'][0][0],
                    'keywords':anaylzed_text[0]['keywords']
                    }

        return {'keyword':None}

    def prepare_slides(self, args):
        # [sentences[],str slideTitle, str subTitle, str direction]
        for i in range(len(args["slides"])):
            raw_slide = args["slides"][i]

            analyzed_sentences = self.analyze({"sentences": raw_slide["sentences"]})

            # Find icons
            for analyzed_sentence in analyzed_sentences:
                analyzed_sentence = PrepareSlides.find_icons(analyzed_sentence)
            args["slides"][i]["analyzed_content"] = analyzed_sentences

            # Simplify
            args["slides"][i] = PrepareSlides.simplify_content(raw_slide)
            
            # Find Slide title image if exist
            if 'slideTitleImage' in raw_slide:
                raw_slide['slideTitleImage']['keyword'] = self.extract_keyword({
                    'text':raw_slide['slideTitle']['slideTitle']
                })['keyword']
                

        return {"slides": args["slides"]}
