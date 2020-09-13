<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DigitalPlatformController extends AbstractController
{
    /**
     * @Route("/digital-platforms/smart-navigator")
     */
    public function smartNavigator()
    {
        return $this->render('digital-platforms/smart-navigator.html.twig');
    }
    /**
     * @Route("/digital-platforms/smart-sonar")
     */
    public function smartSonar()
    {
        return $this->render('digital-platforms/smart-sonar.html.twig');
    }
    /**
     * @Route("/digital-platforms/smart-predictive-policing")
     */
    public function smartPredictivePolicing()
    {
        return $this->render('digital-platforms/smart-predictive-policing.html.twig');
    }

}
