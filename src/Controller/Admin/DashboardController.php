<?php

namespace App\Controller\Admin;

use App\Entity\Presentation;
use App\Entity\User;
use App\Entity\Slide;
use App\Entity\Style;
use App\Entity\Layout;
use App\Entity\DownloadPresentation;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(): Response
    {
        $totalPresentations = $this->getDoctrine()->getManager()
            ->createQueryBuilder()
            ->from('App\Entity\Presentation', 'p')
            ->select('count(p.id)')
            ->getQuery()
            ->getSingleScalarResult();
        $totalUsers = $this->getDoctrine()->getManager()
            ->createQueryBuilder()
            ->from('App\Entity\User', 'u')
            ->select('count(u.id)')
            ->getQuery()
            ->getSingleScalarResult();

        return $this->render('admin/dashboard.html.twig', ['totalPresentations' => $totalPresentations, 'totalUsers' => $totalUsers]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Slideo Admin')
            ->setTitle('<img src="favicon.ico"> Slideo Admin')
            ->setFaviconPath('favicon.ico');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Users', 'fas fa-users', User::class);
        yield MenuItem::linkToCrud('Presentations', 'far fa-file-powerpoint', Presentation::class);
        yield MenuItem::linkToCrud('Slides', 'fas fa-table', Slide::class);
        yield MenuItem::linkToCrud('Downloads', 'fas fa-download', DownloadPresentation::class);
        yield MenuItem::linkToCrud('Styles', 'fas fa-ellipsis-h', Style::class);
        yield MenuItem::linkToCrud('Layouts', 'fas fa-layer-group', Layout::class);
        yield MenuItem::linktoRoute('Go to website', 'fas fa-external-link-alt', 'index');
    }
}
