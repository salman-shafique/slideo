<?php

namespace App\Enum;


use App\Exception\CommonEnumException;

class LanguagesEnum
{

    public const DEFAULT = 'en';

    public const ENGLISH = 'en';
    public const TURKISH = 'tr';
    public const HEBREW = 'he';


    public const AVAILABLE_TYPES = [
        self::ENGLISH => 'English',
        self::TURKISH => 'Turkish',
        self::HEBREW => 'Hebrew'
    ];

    public const CONSTANTS = [
        'English' => self::ENGLISH ,
        'Turkish' =>   self::TURKISH ,
        'Hebrew' => self::HEBREW 
    ];

    public static function validate(string $language)
    {
        if (!isset(self::AVAILABLE_TYPES[$language])) {
            throw new CommonEnumException(self::AVAILABLE_TYPES, $language);
        }
    }

    public static function getDescription(string $language)
    {
        return self::AVAILABLE_TYPES[$language] ?? null;
    }
}