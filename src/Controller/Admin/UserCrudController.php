<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Enum\CompanyEnum;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }



    public function configureFields(string $pageName): iterable
    {
//        $companies = [];
//        foreach (CompanyEnum::COMPANIES as $companyName)
//            $companies[$companyName] = $companyName;

        return [
            IdField::new('id')->hideOnForm(),
            EmailField::new('email'),
            ArrayField::new('roles')->hideOnIndex(),
            TextField::new('fullname'),
            BooleanField::new('isVerified'),
            TextField::new('userType')->onlyOnIndex(),
            AssociationField::new('company'),
            AssociationField::new('presentations')->hideOnForm(),
            DateField::new('created')->hideOnForm()
        ];
    }
}
