from ..Icon import Icon
import unicodedata as UD

icon_class = Icon.Icon()

def find_icons(analyzed_sentence):
    analyzed_sentence["icon"] = {"icons": []}
    if analyzed_sentence["keywords"]:
        # Swicth keywords first and second for non-english languages
        if analyzed_sentence["lang"] != "en":
            if len(analyzed_sentence["keywords"]) >= 2:
                (
                    analyzed_sentence["keywords"][0],
                    analyzed_sentence["keywords"][1],
                ) = (
                    analyzed_sentence["keywords"][1],
                    analyzed_sentence["keywords"][0],
                )

        for keywords in analyzed_sentence["keywords"]:
            for keyword in keywords:
                # When found an icon, break
                if len(analyzed_sentence["icon"]["icons"]) > 0:
                    break
                found_icons = icon_class.find_icons({'keyword':keyword})

                if "icons" in found_icons:
                    for icon in found_icons["icons"]:
                        analyzed_sentence["icon"]["icons"].append(icon["preview_url"])

    # Noting found icon
    if len(analyzed_sentence["icon"]["icons"]) == 0:
        analyzed_sentence["icon"]["icons"] = [
            "/icons/nothing-found.png/(0,0,0)/nothing-found.png"
        ]
    return analyzed_sentence

def check_text_direction(text):
    rtl = 0
    ltr = 0
    for c in text:
        if UD.bidirectional(c) == "R":
            rtl += 1
        if UD.bidirectional(c) == "L":
            ltr += 1
        if rtl + ltr == 7:
            break
    if rtl > ltr:
        return "rtl"
    else:
        return "ltr"
  
def simplify_content(raw_slide):
    # slideTitle
    if "slideTitle" in raw_slide:
        tmp = raw_slide["slideTitle"]
        raw_slide["slideTitle"] = {
            "slideTitle" : tmp,
            "direction" : check_text_direction(tmp)
        }
    # subTitle
    if "subTitle" in raw_slide:
        tmp = raw_slide["subTitle"]
        raw_slide["subTitle"] = {
            "subTitle" : tmp,
            "direction" : check_text_direction(tmp)
        }

    # analyzed_content
    simplified_analyzed_content = []
    analyzed_content = raw_slide["analyzed_content"]
    for i in range(len(analyzed_content)):
        sentence = analyzed_content[i]

        # H1 # New approach - get the second result for translations - first
        h1Text = ""
        if sentence["lang"] == "en":
            h1Text = sentence["not_ruled_words_original"][0]
        else:
            if len(sentence["not_ruled_words_original"]) >= 2:
                h1Text = sentence["not_ruled_words_original"][1]
            else:
                if len(sentence["not_ruled_words_original"]) == 1:
                    h1Text = sentence["not_ruled_words_original"][0]

        # H1 English - for pexels
        h1English = ""
        if sentence["lang"] == "en":
            h1English = sentence["not_ruled_words_english"][0]
        else:
            if len(sentence["not_ruled_words_english"]) >= 2:
                h1English = sentence["not_ruled_words_english"][1]
            else:
                if len(sentence["not_ruled_words_english"]) == 1:
                    h1English = sentence["not_ruled_words_english"][0]

        # h1
        h1 = {
            "h1": h1Text,
            "h1English": h1English,
            "direction": check_text_direction(h1Text),
        }

        # originalSentence
        originalSentence = {
            "originalSentence": sentence["originalSentence"],
            "direction": check_text_direction(sentence["originalSentence"]),
        }

        # Rule. If originalSentence has only 2 or less words, use it as h1
        if len(originalSentence["originalSentence"].split(" ")) <= 2:
            h1["h1"] = originalSentence["originalSentence"]

        simplified_analyzed_content.append(
            {
                "h1": h1,
                "originalSentence": originalSentence,
                "icon": {
                    "icon_path": sentence["icon"]["icons"][0],
                    "icons": sentence["icon"]["icons"],
                },
                "status": "new"
            }
        )
    raw_slide["analyzed_content"] = simplified_analyzed_content
    return raw_slide
