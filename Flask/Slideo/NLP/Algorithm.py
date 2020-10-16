#!/usr/bin/env python
# -*- coding: utf-8 -*-
import argparse
import copy
import string

constants = {
    "dobj": 8,
    "nsubjpass": 7,
    "pobj": 6,
    "appos": 5,
    "nsubj": 4,
    "conj": 3,
    "amod": 2,
    "ROOT": -3,
    "NOUN": 13,
    "VERB": 12,
    "NUM": 11,
    "PROPN": 10,
    "ADJ": 9,
    "entity_score": 0,
}

def clear_word(word):
    table = str.maketrans(dict.fromkeys(string.punctuation))
    word = word.translate(table)
    if word.lower()[0:2] and word.lower()[0:2] == "a ":
        word = word[2:]
    if word.lower()[0:3] and word.lower()[0:3] == "an ":
        word = word[3:]
    if word.lower()[0:4] and word.lower()[0:4] == "the ":
        word = word[4:]
    if word.lower()[0:4] and word.lower()[0:4] == "for ":
        word = word[4:]
    if word.lower()[0:5] and word.lower()[0:4] == "with ":
        word = word[5:]
    if len(word) > 2 and word[-1] == ".":
        word = word[:-1]
    while "  " in word:
        word = word.replace("  ", " ")
    word = word.strip()
    return word.capitalize()

def calculate_total(tokens):
    global constants
    ignored_lemmas = ["-PRON-", "be"]
    newTokens = []
    for token in tokens:
        score = 0
        try:
            score += constants[token["pos"]]
        except:
            pass
        try:
            score += constants[token["dep"]]
        except:
            pass
        try:
            if token["ent_type"]:
                score += constants["entity_score"]
        except:
            pass
        try:
            if token["lemma"] in ignored_lemmas:
                score = 0
        except:
            pass
        token["score"] = score
        newTokens.append(token)
    return newTokens

def get_word(index,sentence_dictionary):
    for word in sentence_dictionary["words"]:
        if sentence_dictionary["words"].index(word) == int(index):
            return word

def incoming_arcs(index,sentence_dictionary):
    incoming_arcs_ = []
    incoming_arc_labels = []
    for arc in sentence_dictionary["arcs"]:
        if arc["dir"] == "left" and arc["start"] == index:
            incoming_arcs_.append(arc)
        if arc["dir"] == "right" and arc["end"] == index:
            incoming_arcs_.append(arc)
    if incoming_arcs_:
        for arc in incoming_arcs_:
            incoming_arc_labels.append(arc["label"])

    return [incoming_arcs_, incoming_arc_labels]

def out_going_arcs(index,sentence_dictionary):
    out_going_arcs_ = []
    out_going_arc_labels = []
    for arc in sentence_dictionary["arcs"]:
        if arc["dir"] == "left" and arc["end"] == index:
            out_going_arcs_.append(arc)
        if arc["dir"] == "right" and arc["start"] == index:
            out_going_arcs_.append(arc)
    if out_going_arcs_:
        for arc in out_going_arcs_:
            out_going_arc_labels.append(arc["label"])
    return [out_going_arcs_, out_going_arc_labels]

def is_inner_arc(myArc,sentence_dictionary):
    start = myArc["start"]
    end = myArc["end"]
    try:
        for arc in sentence_dictionary["arcs"]:
            if arc["start"] >= start and arc["end"] <= end and arc != myArc:
                return False
    except:
        pass
    return True

def get_top_phrases(groupped_sentence):
    sentence_dictionary = groupped_sentence['sentence_dictionary']
    tokens = groupped_sentence['tokens']
    englishSentence = groupped_sentence['englishSentence']

    top_scored_tokens = {}
    for token in tokens:
        top_scored_tokens[token["idx"]] = token["score"]

    sorted_tokens_temp = sorted(
        top_scored_tokens.items(), key=lambda x: x[1], reverse=True
    )

    # Sort the tokens and take the first two ?
    sorted_tokens = []
    sorted_token_scores = {""}
    for sorted_token in sorted_tokens_temp:
        if len(sorted_token_scores) <= 3:
            if (
                len(sorted_tokens) < 2
                or str(sorted_token[1]) in sorted_token_scores
                or len(sorted_token_scores) < 3
            ):
                sorted_token_scores.add(str(sorted_token[1]))
                sorted_tokens.append(sorted_token)

    # Find the words to inspect. After that insert the rules
    words_to_inspect = {}
    word_counter = 0
    for word in sentence_dictionary["words"]:
        for token in sorted_tokens:
            index = token[0]
            keyword_score = token[1]
            if index in range(word["start"], word["end"]):
                # find the beginning token
                for old_token in tokens:
                    if old_token["idx"] == index:
                        word["keywords"] = [
                            old_token["lemma"]
                            if old_token["lemma"]
                            else old_token["text"]
                        ]
                        word["keyword_score"] = keyword_score
                        break
                new_word = copy.deepcopy(word)
                words_to_inspect[str(word_counter)] = [new_word]
                word_counter += 1

    # Escape from the duplicate words
    for i in range(5):
        i = i
        try:
            for index in words_to_inspect:
                for second_index in words_to_inspect:
                    if index != second_index:
                        if (
                            words_to_inspect[index][0]["text"]
                            == words_to_inspect[second_index][0]["text"]
                        ):
                            words_to_inspect[index][0]["keywords"] += words_to_inspect[
                                second_index
                            ][0]["keywords"]
                            del words_to_inspect[second_index]
                            break
        except:
            pass

    # insert the rules and copy keywords
    for index in words_to_inspect:
        word = words_to_inspect[index][0]
        not_ruled_word = words_to_inspect[index][0]["text"]
        word["not_ruled_word"] = not_ruled_word
        merged_score = words_to_inspect[index][0]["score"]
        word["merged_score"] = merged_score
        keyword = words_to_inspect[index][0]["keywords"]
        keyword_score = words_to_inspect[index][0]["keyword_score"]
        # dobj rule
        if "dobj" in word["incoming_arc_labels"]:
            for arc in word["incoming_arcs"]:
                if arc["label"] == "dobj" and arc["is_inner_arc"]:
                    new_word = copy.deepcopy(get_word(arc["start"],sentence_dictionary))
                    new_word["keywords"] = keyword
                    new_word["keyword_score"] = keyword_score
                    new_word["merged_score"] = merged_score
                    new_word["not_ruled_word"] = not_ruled_word
                    words_to_inspect[index] += [new_word]

        # prep -> pobj rule
        if "pobj" in word["incoming_arc_labels"]:
            for arc in word["incoming_arcs"]:
                if arc["label"] == "pobj" and arc["is_inner_arc"]:
                    prep_word = copy.deepcopy(get_word(arc["start"],sentence_dictionary))
                    if "prep" in prep_word["incoming_arc_labels"]:
                        for prep_arc in prep_word["incoming_arcs"]:
                            if prep_arc["label"] == "prep" and prep_arc["is_inner_arc"]:
                                new_word_1 = copy.deepcopy(get_word(prep_arc["start"],sentence_dictionary))
                                new_word_1["keywords"] = keyword
                                new_word_1["keyword_score"] = keyword_score
                                new_word_1["merged_score"] = merged_score
                                new_word_1["not_ruled_word"] = not_ruled_word

                                new_word_2 = copy.deepcopy(get_word(prep_arc["end"],sentence_dictionary))
                                new_word_2["keywords"] = keyword
                                new_word_2["keyword_score"] = keyword_score
                                new_word_2["merged_score"] = merged_score
                                new_word_2["not_ruled_word"] = not_ruled_word
                                words_to_inspect[index] += [new_word_1, new_word_2]

        # agent -> pobj rule
        if "pobj" in word["incoming_arc_labels"]:
            for arc in word["incoming_arcs"]:
                if arc["label"] == "pobj" and arc["is_inner_arc"]:
                    agent_word = copy.deepcopy(get_word(arc["start"],sentence_dictionary))
                    if "agent" in agent_word["incoming_arc_labels"]:
                        for agent_arc in agent_word["incoming_arcs"]:
                            if (
                                agent_arc["label"] == "agent"
                                and agent_arc["is_inner_arc"]
                            ):

                                new_word_1 = copy.deepcopy(get_word(agent_arc["start"],sentence_dictionary))
                                new_word_1["keywords"] = keyword
                                new_word_1["keyword_score"] = keyword_score
                                new_word_1["merged_score"] = merged_score
                                new_word_1["not_ruled_word"] = not_ruled_word

                                new_word_2 = copy.deepcopy(get_word(agent_arc["end"],sentence_dictionary))
                                new_word_2["keywords"] = keyword
                                new_word_2["keyword_score"] = keyword_score
                                new_word_2["merged_score"] = merged_score
                                new_word_2["not_ruled_word"] = not_ruled_word
                                words_to_inspect[index] += [new_word_1, new_word_2]

        # conj -> rule
        if "conj" in word["incoming_arc_labels"]:
            for arc in word["incoming_arcs"]:
                if arc["label"] == "conj" and arc["is_inner_arc"]:
                    new_word = copy.deepcopy(get_word(arc["start"],sentence_dictionary))
                    new_word["keywords"] = keyword
                    new_word["keyword_score"] = keyword_score
                    new_word["merged_score"] = merged_score
                    new_word["not_ruled_word"] = not_ruled_word
                    words_to_inspect[index] += [new_word]

        # <- nsubj rule
        if "nsubj" in word["incoming_arc_labels"]:
            for arc in word["incoming_arcs"]:
                if arc["label"] == "nsubj" and arc["is_inner_arc"]:
                    new_word = copy.deepcopy(get_word(arc["end"],sentence_dictionary))
                    new_word["keywords"] = keyword
                    new_word["keyword_score"] = keyword_score
                    new_word["merged_score"] = merged_score
                    new_word["not_ruled_word"] = not_ruled_word
                    words_to_inspect[index] += [new_word]

    # Sort the words according to the indexes
    for index in words_to_inspect:
        words_to_inspect[index] = sorted(
            words_to_inspect[index], key=lambda i: i["start"]
        )

    # Check the NEG rule
    for index in words_to_inspect:
        first_word = words_to_inspect[index][0]
        if (
            "neg" in first_word["out_going_arc_labels"]
            and "aux" in first_word["out_going_arc_labels"]
        ):
            for neg_arc in first_word["out_going_arcs"]:
                if neg_arc["label"] == "neg" and neg_arc["is_inner_arc"]:
                    for aux_arc in first_word["out_going_arcs"]:
                        if aux_arc["label"] == "aux":
                            new_word_1 = copy.deepcopy(get_word(aux_arc["start"],sentence_dictionary))
                            new_word_1["keywords"] = first_word["keywords"]
                            new_word_1["keyword_score"] = first_word["keyword_score"]
                            new_word_1["merged_score"] = first_word["merged_score"]
                            new_word_1["not_ruled_word"] = first_word["not_ruled_word"]

                            new_word_2 = copy.deepcopy(get_word(neg_arc["start"],sentence_dictionary))
                            new_word_2["keywords"] = first_word["keywords"]
                            new_word_2["keyword_score"] = first_word["keyword_score"]
                            new_word_2["merged_score"] = first_word["merged_score"]
                            new_word_2["not_ruled_word"] = first_word["not_ruled_word"]

                            words_to_inspect[index] += [new_word_1, new_word_2]

    # Sort the words according to the indexes after NEG rule
    for index in words_to_inspect:
        words_to_inspect[index] = sorted(
            words_to_inspect[index], key=lambda i: i["start"]
        )

    # Sort the words according to scores then combine
    top_result = []
    for index in words_to_inspect:
        scores = 0
        alignment = []

        for word in words_to_inspect[index]:
            scores += word["score"]
        alignment += [
            words_to_inspect[index][0]["start"],
            words_to_inspect[index][-1]["end"],
        ]

        joined_words = englishSentence[
            words_to_inspect[index][0]["start"] : words_to_inspect[index][-1]["end"]
        ]
        top_result.append(
            (
                joined_words,
                alignment,
                words_to_inspect[index][0]["keywords"],
                words_to_inspect[index][0]["not_ruled_word"],
                words_to_inspect[index][0]["keyword_score"],
                words_to_inspect[index][0]["merged_score"],
                scores,
            )
        )

    keyword_score_sort = sorted(top_result, key=lambda x: x[-3], reverse=True)

    for i in range(1, len(keyword_score_sort)):
        if keyword_score_sort[0][-3] == keyword_score_sort[i][-3]:
            keyword_score_sort[0 : (i + 1)] = sorted(
                keyword_score_sort[0 : (i + 1)], key=lambda x: x[-2], reverse=True
            )
            if keyword_score_sort[0][-2] == keyword_score_sort[i][-2]:
                keyword_score_sort[0 : (i + 1)] = sorted(
                    keyword_score_sort[0 : (i + 1)], key=lambda x: x[-1], reverse=True
                )

    # If all words are merged rule
    if len(sentence_dictionary["words"]) == 1:
        e = copy.deepcopy(keyword_score_sort[0])
        keyword_score_sort = [(e[0], e[1], e[2], e[2][0], e[4], e[5], e[6])]

    # Long H1 - not-ruled word - index 3
    if len(keyword_score_sort[0][3].split(" ")) >= 4:
        e = copy.deepcopy(keyword_score_sort[0])
        keyword_score_sort = [(e[0], e[1], e[2], e[2][0], e[4], e[5], e[6])]

    return keyword_score_sort

def check_parentheses_status(englishSentence, tokens):
    parentheses = []
    parentheses_stack = []
    top = -1
    for token in tokens:
        char = token["text"]
        if char == "(":
            parentheses_stack.append({"start": token["idx"]})
            top += 1
            continue
        if char == ")":
            if (len(parentheses_stack) - 1) <= top and top != -1:
                # If the whole sentence in the parentheses - ignore parentheses
                if parentheses_stack[top]["start"] == 0 and token["idx"] == (
                    len(englishSentence) - 1
                ):
                    break
                parentheses_stack[top]["end"] = token["idx"]
                parentheses.append(parentheses_stack[top])
                del parentheses_stack[top]
                top -= 1
    for token in tokens:
        token["in_parentheses"] = False
        for a_parentheses in parentheses:
            if not "end" in a_parentheses:
                a_parentheses["end"] = a_parentheses["start"]
            if a_parentheses["start"] <= token["idx"] <= a_parentheses["end"]:
                token["in_parentheses"] = True
                token["score"] = 0
                break

# Algorithm starts here
def split_sentences(originalSentences):
    originalSentencesArgvTemp = []
    for originalSentence in originalSentences:
        originalSentence = originalSentence.strip()
        while "  " in originalSentence:
            originalSentence = originalSentence.replace("  ", " ")
        if originalSentence:
            originalSentencesArgvTemp.append(originalSentence)
    return originalSentences

def analyze(groupped_sentences):
    global constants
    master_result = []
    for groupped_sentence in groupped_sentences:
        groupped_sentence.update(
            {
                "englishH1s": [],
                "H1Scores": [],
                "keyword_scores": [],
                "merged_scores": [],
                "constants": constants,
                "originalH1s": [],
                "keywords": [],
                "not_ruled_words_english": [],
                "not_ruled_words_original": [],
            }
        )

        sentence_dictionary = groupped_sentence["sentence_dictionary"]

        english_sentence_tmp = groupped_sentence['englishSentence']
        for i in range(len(sentence_dictionary["words"])):
            sentence_dictionary["words"][i]["start"] = english_sentence_tmp.index(
                sentence_dictionary["words"][i]["text"]
            )
            english_sentence_tmp = english_sentence_tmp.replace(
                sentence_dictionary["words"][i]["text"],
                "|" * len(sentence_dictionary["words"][i]["text"]),
                1,
            )
            sentence_dictionary["words"][i]["end"] = sentence_dictionary["words"][i][
                "start"
            ] + len(sentence_dictionary["words"][i]["text"])

        # Check if the words are in the parentheses
        check_parentheses_status( groupped_sentence['englishSentence'], groupped_sentence['tokens'])

        # Append token scores into the sentence_dictionary->words
        for word in sentence_dictionary["words"]:
            word["score"] = 0
            for token in groupped_sentence['tokens']:
                if token["idx"] in range(word["start"], word["end"]):
                    word["score"] += token["score"]

        # Specialize the sentence_dictionary->arcs
        for arc in sentence_dictionary["arcs"]:
            arc["is_inner_arc"] = is_inner_arc(arc,sentence_dictionary)

        # Specialize the sentence_dictionary->words
        for i in range(len(sentence_dictionary["words"])):
            word = sentence_dictionary["words"][i]
            incoming_arcs_temp = incoming_arcs(i,sentence_dictionary)
            out_going_arcs_temp = out_going_arcs(i,sentence_dictionary)
            word["incoming_arcs"], word["incoming_arc_labels"] = (
                incoming_arcs_temp[0],
                incoming_arcs_temp[1],
            )
            word["out_going_arcs"], word["out_going_arc_labels"] = (
                out_going_arcs_temp[0],
                out_going_arcs_temp[1],
            )

        possibleH1s = get_top_phrases(groupped_sentence)[0:10]
        for (
            h1,
            alignment,
            keywords,
            not_ruled_word,
            keyword_score,
            merged_score,
            total_score,
        ) in possibleH1s:
            groupped_sentence["englishH1s"].append(h1)
            groupped_sentence["H1Scores"].append(total_score)
            groupped_sentence["keyword_scores"].append(keyword_score)
            groupped_sentence["merged_scores"].append(merged_score)
            groupped_sentence["keywords"].append(keywords)
            groupped_sentence["not_ruled_words_english"].append(not_ruled_word)

        # Escape from spaces
        possibleH1sTemp = []
        if groupped_sentence["englishH1s"]:
            for possibleH1 in groupped_sentence["englishH1s"]:
                try:
                    if possibleH1[-1] == ",":
                        possibleH1 = possibleH1[:-1]
                except:
                    pass
                possibleH1 = possibleH1.strip()
                possibleH1sTemp.append(possibleH1)
            groupped_sentence["englishH1s"] = possibleH1sTemp

        # Clear H1s and not_ruled_words
        if groupped_sentence["englishH1s"]:
            for i in range(len(groupped_sentence["englishH1s"])):
                groupped_sentence["englishH1s"][i] = clear_word(
                    groupped_sentence["englishH1s"][i]
                )

        if groupped_sentence["not_ruled_words_english"]:
            for i in range(len(groupped_sentence["not_ruled_words_english"])):
                groupped_sentence["not_ruled_words_english"][i] = clear_word(
                    groupped_sentence["not_ruled_words_english"][i]
                )


        master_result.append(groupped_sentence)

    return master_result
