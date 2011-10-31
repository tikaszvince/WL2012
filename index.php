<?php

ini_set('display_errors', 1);
ini_set('error_reporting', -1);

$base = dirname( $_SERVER['SCRIPT_NAME'] );
$s = isset( $_GET['s'] ) ? trim(strip_tags($_GET['s'])) : '';
$requestUri = preg_replace( '#^'.$base.'#', '', $_SERVER['REQUEST_URI'] );

$dumpURI = false;
$brick = false;

switch( true ) {
	case '/' == $requestUri:
	case '' == $requestUri:
		$title = null; $page = 'index.html'; break;
	case '/tagok/belepes' == $requestUri:
		$title = 'Belépés'; $page = 'login.html'; break;
	case '/tagok/regisztracio' == $requestUri:
		$title = 'Regisztráció'; $page = 'signin.html'; break;
	case '/tagok/jelszo' == $requestUri:
		$title = 'Elfelejtett jelszó'; $page = 'lostpass.html'; break;
	case '/blog' == $requestUri:
		$title = 'Blog bejegyzése'; $page = 'blog.html'; break;
	case preg_match('#^/blog/\d+/.*#', $requestUri ):
		$title = 'Blog bejegyzés'; $page = 'blogpost.html'; break;
	case '/cikkek' == $requestUri:
		$title = 'Cikkek'; $page = 'cikkek.html'; break;
	case preg_match('#^/cikkek/.+#', $requestUri ):
		$title = 'Cikk oldal'; $page = 'cikk.html'; break;
	case '/blogmarkok' == $requestUri:
		$title = 'Blogmarkok'; $page = 'blogmarkok.html'; break;
	case preg_match('#^/blogmarkok/\d+#', $requestUri ):
		$title = 'Blogmark oldal'; $page = 'blogmark.html'; break;
	case '/forumok' == $requestUri:
		$title = 'Fórumok'; $page = 'forumok.html'; break;
	case '/brick/commentform.html' == $requestUri:
		$brick = 'commentform.html'; break;
	case preg_match('#^/forumok/\d+#', $requestUri ):
		$title = 'Fórumok'; $page = 'forum.html'; break;
	case preg_match('#^/forumok/temak/\d+#', $requestUri ):
		$title = 'Fórumok'; $page = 'forumtema.html'; break;
	case preg_match('#^/forumok/#', $requestUri ):
		$title = 'Fórumok'; $page = 'forumtemak.html'; break;
	default:
		$dumpURI = true;
		$title = 'Nem található!'; $page = '404.html'; break;
}

if ( !$brick ) {
	include 'bricks/head.html';
	if ( $dumpURI ) {
		var_dump( $title, $page );
	}
	include 'page/'.$page;
	include 'bricks/foot.html';
}
else {
	include 'bricks/'.$brick;
}
//end
