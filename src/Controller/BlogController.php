<?php

namespace App\Controller;

use App\Repository\PostRepository;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/blog",name="blog")
 */
class BlogController extends AbstractController
{
    /**
     * @Route("/")
     * @param PostRepository $postRepository
     */
    public function index(PostRepository $postRepository)
    {
        $posts = $postRepository->findAll();
        return $this->render('blog/index.html.twig', ['posts' => $posts]);
    }
    /**
     * @Route("/{postId}")
     * @param null|int $postId
     * @param PostRepository $postRepository
     */
    public function team(int $postId, PostRepository $postRepository)
    {
        $post = $postRepository->findOneById($postId);
        if ($post && $post->getActive())
            return $this->render('blog/post.html.twig', ['post' => $post]);
        else
            return $this->redirectToRoute('blog');
    }
}
