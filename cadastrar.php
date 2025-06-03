<?php
include 'conexao.php';
$nome = "João da Silva";
$email = "test@gmail.com";
$senha = "1234"; // senha digitada
$senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);
try {
   $sql = "INSERT INTO usuarios (nome_usuario, email, senha) VALUES (:nome, :email, :senha)";
   $stmt = $pdo->prepare($sql);
   $stmt->bindParam(':nome', $nome);
   $stmt->bindParam(':email', $email);
   $stmt->bindParam(':senha', $senhaCriptografada);
   $stmt->execute();
   echo "Usuário cadastrado com sucesso!";
} catch (PDOException $e) {
   echo "Erro ao cadastrar: " . $e->getMessage();
}
?>