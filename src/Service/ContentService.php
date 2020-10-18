<?php

namespace App\Service;

use App\Entity\Content;

class ContentService
{

    public function serialize(?Content $content)
    {
        if(!$content) return [];
        
        return [$content->getKeyword() => $content->getData()];
    }
}
