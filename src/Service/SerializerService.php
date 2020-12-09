<?php

namespace App\Service;

use App\Entity\Style;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;

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
        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));
        $normalizer = new ObjectNormalizer($classMetadataFactory, null, null, null, null, null, $defaultContext);

        $this->serializer =  new Serializer([$normalizer], [$encoder]);
    }

    public function normalize(Object $object): array
    {
        return $this->serializer->normalize($object,null);
    }

    public function serialize(Object $object): string
    {
        return $this->serializer->serialize($object, 'json');
    }
}
