<?php
session_start();

// Destrói todos os dados da sessão
session_unset();
session_destroy();

// Redireciona para a página de login
header('Location: index2.php');
exit();
?>
