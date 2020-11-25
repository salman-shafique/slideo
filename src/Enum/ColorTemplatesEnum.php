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
            "id" => 0,
            "title" => "Light & Bright",
            "description" => "Lovely Bright Colors to light up your presentation",
            self::ACCENT_1 => '#FFFFFFFF',
            self::ACCENT_2 => '#FF00007F',
            self::ACCENT_3 => '#FFFF00FF',
            self::ACCENT_4 => '#00FFFF89',
            self::ACCENT_5 => '#00FF00CC',
            self::ACCENT_6 => '#FF00FF19',
            self::BACKGROUND_1 => '#0000FFFF',
            self::BACKGROUND_2 => '#0FF0FF99',
            self::TEXT_1 => '#F00F0F33',
            self::TEXT_2 => '#AEDEBFFF'
        ],
        self::GREEN => [
            "id" => 1,
            "title" => "Green",
            "description" => "Fresh Green Shades to help your message grow",
            self::ACCENT_1 => '#008080FF',
            self::ACCENT_2 => '#556B2FFF',
            self::ACCENT_3 => '#008000FF',
            self::ACCENT_4 => '#00FA9AFF',
            self::ACCENT_5 => '#556B2FFF',
            self::ACCENT_6 => '#008B8BFF',
            self::BACKGROUND_1 => '#66CDAAFF',
            self::BACKGROUND_2 => '#ADFF2FFF',
            self::TEXT_1 => '#2E8B57FF',
            self::TEXT_2 => '#9ACD32FF'
        ],
        self::METALIC => [
            "id" => 2,
            "title" => "Metallic",
            "description" => "A collection of hues from unique metals",
            self::ACCENT_1 => '#FFD700FF',
            self::ACCENT_2 => '#C0C0C0FF',
            self::ACCENT_3 => '#CD7F32FF',
            self::ACCENT_4 => '#B87333FF',
            self::ACCENT_5 => '#00A76BFF',
            self::ACCENT_6 => '#E5E4E2FF',
            self::BACKGROUND_1 => '#4682B4FF',
            self::BACKGROUND_2 => '#FFD1B2FF',
            self::TEXT_1 => '#9090A3FF',
            self::TEXT_2 => '#B7410EFF'
        ],
    ];


    public static function validate(string $templateTitle)
    {
        return isset(self::TEMPLATES[$templateTitle]);
    }
}
