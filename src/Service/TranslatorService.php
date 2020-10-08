<?php

namespace App\Service;

use App\Service\PostService;


class TranslatorService
{
    private $post;

    public function __construct(PostService $post)
    {
        $this->post = $post;
    }

    public function translate(String $originalSentence, String $targetLanguage = "en")
    {
        return $this->post->execute(
            "Translator",
            "translate",
            [
                "originalSentence" => $originalSentence,
                "targetLanguage" => $targetLanguage
            ]
        );
    }

    public function test(Array $request = ['no'=>'req'])
    {
        return $this->post->execute(
            "Test",
            "echo_test",
            $request
        );
    }
}
