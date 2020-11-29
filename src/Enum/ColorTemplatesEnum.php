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
            self::ACCENT_1 => '#FFFFFF',
            self::ACCENT_2 => '#FF0000',
            self::ACCENT_3 => '#FFFF00',
            self::ACCENT_4 => '#00FFFF',
            self::ACCENT_5 => '#00FF00',
            self::ACCENT_6 => '#FF00FF',
            self::BACKGROUND_1 => '#0000FF',
            self::BACKGROUND_2 => '#0FF0FF',
            self::TEXT_1 => '#F00F0F',
            self::TEXT_2 => '#AEDEBF'
        ],
        self::GREEN => [
            "id" => 1,
            "title" => "Green",
            "description" => "Fresh Green Shades to help your message grow",
            self::ACCENT_1 => '#008080',
            self::ACCENT_2 => '#556B2F',
            self::ACCENT_3 => '#008000',
            self::ACCENT_4 => '#00FA9A',
            self::ACCENT_5 => '#556B2F',
            self::ACCENT_6 => '#008B8B',
            self::BACKGROUND_1 => '#66CDAA',
            self::BACKGROUND_2 => '#ADFF2F',
            self::TEXT_1 => '#2E8B57',
            self::TEXT_2 => '#9ACD32'
        ],
        self::METALIC => [
            "id" => 2,
            "title" => "Metallic",
            "description" => "A collection of hues from unique metals",
            self::ACCENT_1 => '#FFD700',
            self::ACCENT_2 => '#C0C0C0',
            self::ACCENT_3 => '#CD7F32',
            self::ACCENT_4 => '#B87333',
            self::ACCENT_5 => '#00A76B',
            self::ACCENT_6 => '#E5E4E2',
            self::BACKGROUND_1 => '#4682B4',
            self::BACKGROUND_2 => '#FFD1B2',
            self::TEXT_1 => '#9090A3',
            self::TEXT_2 => '#B7410E'
        ],
    ];


    public static function validate(string $templateTitle)
    {
        return isset(self::TEMPLATES[$templateTitle]);
    }
}
