<?php

namespace App\Service;

use App\Entity\Content;

class ContentService
{

    public function serialize(?Content $content)
    {
        if(!$content) return [];
        
        return [$content->getKeyword() => array_merge($content->getData(),['entity_id'=>$content->getId()])];
    }
}
