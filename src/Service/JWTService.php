<?php

namespace App\Service;

use Exception;
use Firebase\JWT\JWT;

class JWTService
{
    public static function encode(array $payload)
    {
        return JWT::encode($payload,  getenv('APP_SECRET'));
    }

    public static function decode(string $jwt)
    {
        try {
            return (array)JWT::decode($jwt,  getenv('APP_SECRET'), array('HS256'));
        } catch (Exception $e) {
            return null;
        }
    }
}
