<?php

namespace App\Controller\Admin;

use App\Entity\DownloadPresentation;
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

class DownloadPresentationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return DownloadPresentation::class;
    }

    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->remove(Crud::PAGE_INDEX, Action::NEW)
            ->remove(Crud::PAGE_INDEX, Action::EDIT)
            ->remove(Crud::PAGE_DETAIL, Action::EDIT);
    }
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            DateField::new('created'),
            AssociationField::new('presentation', 'Presentation')
                ->formatValue(function ($value, $entity) {
                    $presentationId = $entity->getPresentation()->getPresentationId();
                    return "<a href='/editor/$presentationId'>$presentationId</a>";
                }),
            BooleanField::new('isPaid')
                ->setFormTypeOption('disabled','true'),
            UrlField::new('pptxFile'),
            UrlField::new('pdfFile'),
            ImageField::new('prevFile'),
            IntegerField::new('numberOfSlides'),
            BooleanField::new('completed')
        ];
    }
}
