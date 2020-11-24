<?php

namespace App\Enum;

class ColorTemplatesEnum
{
    public const LIGHT = 'LIGHT';
    public const GREEN = 'GREEN';
    public const METALIC = 'METALIC';

    public const ACCENT_1 = 'ACCENT_1';
    public const ACCENT_2 = 'ACCENT_2';
    public const ACCENT_3 = 'ACCENT_3';
    public const ACCENT_4 = 'ACCENT_4';
    public const ACCENT_5 = 'ACCENT_5';
    public const ACCENT_6 = 'ACCENT_6';
    public const BACKGROUND_1 = 'BACKGROUND_1';
    public const BACKGROUND_2 = 'BACKGROUND_2';
    public const TEXT_1 = 'TEXT_1';
    public const TEXT_2 = 'TEXT_2';

    public const COLOR_NAMES = [
        self::ACCENT_1,
        self::ACCENT_2,
        self::ACCENT_3,
        self::ACCENT_4,
        self::ACCENT_5,
        self::ACCENT_6,
        self::BACKGROUND_1,
        self::BACKGROUND_2,
        self::TEXT_1,
        self::TEXT_2,
    ];

    public const TEMPLATES = [
        self::LIGHT => [
            "name" => "Light & Bright",
            "description" => "Lovely Bright Colors to light up your presentation",
            self::ACCENT_1 => 'rgba(255,255,255,1)',
            self::ACCENT_2 => 'rgba(255,0,0,0.5)',
            self::ACCENT_3 => 'rgba(255,255,0,1)',
            self::ACCENT_4 => 'rgba(0,255,255,0.54)',
            self::ACCENT_5 => 'rgba(0,255,0,0.8)',
            self::ACCENT_6 => 'rgba(255,0,255,0.1)',
            self::BACKGROUND_1 => 'rgba(0,0,255,1)',
            self::BACKGROUND_2 => 'rgba(15,240,255,0.6)',
            self::TEXT_1 => 'rgba(240,15,15,0.2)',
            self::TEXT_2 => 'rgba(174,222,191,1)'
        ],
        self::GREEN => [
            "name" => "Green",
            "description" => "Fresh Green Shades to help your message grow",
            self::ACCENT_1 => 'rgba(0,128,128,1)',
            self::ACCENT_2 => 'rgba(85,107,47,1)',
            self::ACCENT_3 => 'rgba(0,128,0,1)',
            self::ACCENT_4 => 'rgba(0,250,154,1)',
            self::ACCENT_5 => 'rgba(85,107,47,1)',
            self::ACCENT_6 => 'rgba(0,139,139,1)',
            self::BACKGROUND_1 => 'rgba(102,205,170,1)',
            self::BACKGROUND_2 => 'rgba(173,255,47,1)',
            self::TEXT_1 => 'rgba(46,139,87,1)',
            self::TEXT_2 => 'rgba(154,205,50,1)'
        ],
        self::METALIC => [
            "name" => "Metallic",
            "description" => "A collection of hues from unique metals",
            self::ACCENT_1 => 'rgba(255,215,0,1)',
            self::ACCENT_2 => 'rgba(192,192,192,1)',
            self::ACCENT_3 => 'rgba(205,127,50,1)',
            self::ACCENT_4 => 'rgba(184,115,51,1)',
            self::ACCENT_5 => 'rgba(0,167,107,1)',
            self::ACCENT_6 => 'rgba(229,228,226,1)',
            self::BACKGROUND_1 => 'rgba(70,130,180,1)',
            self::BACKGROUND_2 => 'rgba(255,209,178,1)',
            self::TEXT_1 => 'rgba(144,144,163,1)',
            self::TEXT_2 => 'rgba(183,65,14,1) '
        ],
    ];


    public static function validate(string $templateTitle)
    {
        return isset(self::TEMPLATES[$templateTitle]);
    }
}
