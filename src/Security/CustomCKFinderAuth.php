<?php

namespace App\Security;

use CKSource\Bundle\CKFinderBundle\Authentication\Authentication as AuthenticationBase;

class CustomCKFinderAuth extends AuthenticationBase
{
    public function authenticate()
    {
        return true;
        // $user = $this->security->getUser();
        // if (!in_array('ROLE_ADMIN',  $user->getRoles()))
        //     return true;
        // else return false;
    }
}
