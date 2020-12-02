import unicodedata as UD


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
        if tmp:
            raw_slide["slideTitle"] = {
                "text" : tmp,
                "direction" : check_text_direction(tmp)
            }
        else:
            del raw_slide["slideTitle"]


    # subTitle
    if "subTitle" in raw_slide:
        tmp = raw_slide["subTitle"]
        if tmp:
            raw_slide["subTitle"] = {
                "text" : tmp,
                "direction" : check_text_direction(tmp)
            }
        else:
            del raw_slide["subTitle"]

    # analyzed_content
    simplified_analyzed_content = []
    analyzed_content = raw_slide["analyzed_content"]
    for i in range(len(analyzed_content)):
        sentence = analyzed_content[i]

        h1Text = sentence["not_ruled_words_original"][0]
        # h1
        h1 = {
            "text": h1Text,
            "direction": check_text_direction(h1Text),
        }

        # originalSentence
        originalSentence = {
            "text": sentence["originalSentence"],
            "direction": check_text_direction(sentence["originalSentence"]),
        }

        # Rule. If originalSentence has only 2 or less words, use it as h1
        if len(originalSentence["text"].split(" ")) <= 2:
            h1["text"] = originalSentence["text"]

        simplified_analyzed_content.append(
            {
                "h1": h1,
                "originalSentence": originalSentence,
                "icon": {
                    "keyword": h1['text'],
                    "icon": {}
                }
            }
        )
    raw_slide["analyzed_content"] = simplified_analyzed_content

    return raw_slide
