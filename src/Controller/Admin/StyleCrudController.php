<?php

namespace App\Controller\Admin;

use App\Entity\Style;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Action;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\UrlField;
use App\Enum\CompanyEnum;

class StyleCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Style::class;
    }


    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->remove(Crud::PAGE_INDEX, Action::NEW)
            ->remove(Crud::PAGE_INDEX, Action::DELETE)
            ->remove(Crud::PAGE_DETAIL, Action::EDIT);
    }
    public function configureFields(string $pageName): iterable
    {        $companies = [];
        foreach (CompanyEnum::COMPANIES as $companyName)
            $companies[$companyName] =  $companyName;
        return [
            IdField::new('id')->hideOnForm(),
            BooleanField::new('isActive'),
            ArrayField::new('keywords'),
            IntegerField::new('capacity'),
            TextField::new('direction'),
            AssociationField::new('layout'),
            BooleanField::new('isDefault'),
            ChoiceField::new('company')->setChoices($companies),
            UrlField::new('pptxFile')->hideOnForm(),
            UrlField::new('svgFile')->hideOnForm(),
            ImageField::new('prevFile')->hideOnForm(),
            DateField::new('created')->hideOnForm()
        ];
    }
}
