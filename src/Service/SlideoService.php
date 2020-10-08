<?php

namespace App\Service;

use App\Service\TranslatorService;

class SlideoService
{
    private $translator;

    public function __construct(TranslatorService $translator)
    {
        $this->translator = $translator;
    }

    public function getTranslator()
    {
        return $this->translator;
    }
}
