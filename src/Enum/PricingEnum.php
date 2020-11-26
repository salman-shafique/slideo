<?php
namespace App\Enum;

class PricingEnum
{
    // PLANS
    public const PLAN_MONTHLY_PERSONAL = 'PLAN_MONTHLY_PERSONAL';
    public const PLAN_ANNUAL_PERSONAL = 'PLAN_ANNUAL_PERSONAL';
    public const PLAN_MONTHLY_SMALL_TEAM = 'PLAN_MONTHLY_SMALL_TEAM';
    public const PLAN_ANNUAL_SMALL_TEAM = 'PLAN_ANNUAL_SMALL_TEAM';
    public const PLAN_MONTHLY_ENTERPRISE = 'PLAN_MONTHLY_ENTERPRISE';
    public const PLAN_ANNUAL_ENTERPRISE = 'PLAN_ANNUAL_ENTERPRISE';

    // PRODUCTS
    public const ONE_PRESENTATION = 'ONE_PRESENTATION';


    public const PLANS = [
        self::PLAN_MONTHLY_PERSONAL => [
            "uniqueName" => self::PLAN_MONTHLY_PERSONAL,
            "freeTrialDays" => 0,
            "name" => "Candidate Starter Monthly",
            "description" => "3 retake test opportunity per month",
            "billingIntervalUnit" => "MONTH",
            "price" => 45,
            "limits" => [
                "reTakeTest" => 3
            ],
        ],
        self::PLAN_ANNUAL_PERSONAL => [
            "uniqueName" => self::PLAN_ANNUAL_PERSONAL,
            "freeTrialDays" => 0,
            "name" => "Candidate Starter Annual",
            "description" => "3 retake test opportunity per month",
            "billingIntervalUnit" => "YEAR",
            "price" => 500,
            "limits" => [
                "reTakeTest" => 3
            ],
        ],
        self::PLAN_MONTHLY_SMALL_TEAM => [
            "uniqueName" => self::PLAN_MONTHLY_SMALL_TEAM,
            "freeTrialDays" => 0,
            "name" => "Candidate Basic Monthly",
            "description" => "6 retake test opportunity per month",
            "billingIntervalUnit" => "MONTH",
            "price" => 70,
            "limits" => [
                "reTakeTest" => 6
            ],
        ],
        self::PLAN_ANNUAL_SMALL_TEAM => [
            "uniqueName" => self::PLAN_ANNUAL_SMALL_TEAM,
            "freeTrialDays" => 0,
            "name" => "Candidate Basic Annual",
            "description" => "6 retake test opportunity per month",
            "billingIntervalUnit" => "YEAR",
            "price" => 750,
            "limits" => [
                "reTakeTest" => 6
            ],
        ],
        self::PLAN_MONTHLY_ENTERPRISE => [
            "uniqueName" => self::PLAN_MONTHLY_ENTERPRISE,
            "freeTrialDays" => 0,
            "name" => "Candidate Standard Monthly",
            "description" => "15 retake test opportunity per month",
            "billingIntervalUnit" => "MONTH",
            "price" => 112,
            "limits" => [
                "reTakeTest" => 15
            ],
        ],
        self::PLAN_ANNUAL_ENTERPRISE => [
            "uniqueName" => self::PLAN_ANNUAL_ENTERPRISE,
            "freeTrialDays" => 0,
            "name" => "Candidate Standard Annual",
            "description" => "15 retake test opportunity per month",
            "billingIntervalUnit" => "YEAR",
            "price" => 1250,
            "limits" => [
                "reTakeTest" => 15
            ],
        ]
    ];

    public const PRODUCTS = [
        self::ONE_PRESENTATION => [
            "uniqueName" => self::ONE_PRESENTATION,
            "description" => "3 retake test opportunity per month",
            "price" => 5,
        ]
    ];

    public static function isValid(string $uniqueName)
    {
        return isset(self::PLANS[$uniqueName]) || isset(self::PRODUCTS[$uniqueName]);
    }
}