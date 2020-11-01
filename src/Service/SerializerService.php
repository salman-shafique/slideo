<?php

namespace App\Service;

use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class SerializerService
{
    private $serializer;

    public function __construct()
    {
        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);

        $this->serializer =  new Serializer([$normalizer], [$encoder]);
    }

    public function normalize(Object $object): array
    {
        return $this->serializer->normalize($object,null, [AbstractNormalizer::IGNORED_ATTRIBUTES => ['owner']]);
    }

    public function serialize(Object $object): string
    {
        return $this->serializer->serialize($object, 'json');
    }
}
