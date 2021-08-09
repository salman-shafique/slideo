<?php

namespace App\Controller\Editor;

use App\Entity\Style;
use App\Enum\CompanyEnum;
use App\Repository\CompanyRepository;
use App\Service\StyleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Security\PresentationSecurity;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * @Route("/api/style",methods={"POST"})
 */
class StyleApiController extends AbstractController
{
    private $companyRepository;

    public function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    /**
     * @Route("/add")
     */
    public function addStyle(Request $request, StyleService $styleService)
    {
        $r = $styleService->add($request);
        return new JsonResponse($r);
    }

    /**
     * @Route("/getCompanies")
     */
    public function getCompanies(Request $request)
    {
        if ($request->request->get("A2A3EF62A0498A46531B71DBD6969004") != "D363D75DD3E229BD8BBE2759E93FDE11")
            return new JsonResponse(["descr" => "Not authorized"]);
        $companies = $this->companyRepository->getAll();
        return new JsonResponse($companies);
    }


    /**
     * @Route("/get")
     */
    public function getStyles(Request $request, SessionInterface $sessionInterface, PresentationSecurity $presentationSecurity, StyleService $styleService)
    {
        $presentation = $presentationSecurity->getPresentation($request->server->get("HTTP_REFERER"), $sessionInterface->getId(), $this->getUser());
        if (!$presentation) throw $this->createNotFoundException('The presentation does not exist');

        $r = $styleService->get($request);

        return new JsonResponse($r);
    }
}
