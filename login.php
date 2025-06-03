<?php
session_start();
include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['email'] ?? '';
    $senhausuario = $_POST['senha'] ?? '';

    // Preparar a consulta SQL para buscar usuário por email
    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $usuario, PDO::PARAM_STR);
    $stmt->execute();

    $usuarioEncontrado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuarioEncontrado) {
        $hashed_password = $usuarioEncontrado['senha'];
        // Verifica a senha usando password_verify (supondo que as senhas estejam hashadas)
        if (password_verify($senhausuario, $hashed_password)) {
            // Armazena dados do usuário na sessão dentro de um array 'usuario'
            $_SESSION['usuario'] = [
                'id' => $usuarioEncontrado['id_usuario'],
                'nome' => $usuarioEncontrado['nome_usuario'],
                'email' => $usuarioEncontrado['email'],
                'foto' => !empty($usuarioEncontrado['foto']) ? $usuarioEncontrado['foto'] : 'imagens/default-profile.png'
            ];

            // Redireciona para página principal (sobrenos.php)
            header('Location: sobrenos.php');
            exit();
        } else {
            // Senha inválida
            header('Location: usuario_recusado.php');
            exit();
        }
    } else {
        // Usuário não encontrado
        header('Location: usuario_recusado.php');
        exit();
    }
} else {
    // Redireciona para a página de login caso acesse por GET ou outro método
    header('Location: index2.php');
    exit();
}
?>
