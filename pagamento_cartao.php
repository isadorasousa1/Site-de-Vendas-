<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $nome = $_POST['nome'] ?? '';
  $numero = $_POST['numero'] ?? '';
  $validade = $_POST['validade'] ?? '';
  $cvv = $_POST['cvv'] ?? '';
  $pedidoId = $_POST['pedidoId'] ?? '';
  $valorTotal = $_POST['valorTotal'] ?? '';

  // Simulação de validação simples (NÃO USAR EM PRODUÇÃO)
  if ($nome && $numero && $validade && $cvv) {
    $mensagem = "Pagamento aprovado!";
  } else {
    $mensagem = "Erro: Dados incompletos.";
  }
} else {
  header("Location: Todos.html");
  exit;
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <title>Confirmação de Pagamento</title>
  <link rel="stylesheet" href="senhac.css">
</head>

<body class="light-theme">
  <div class="container" style="padding: 20px;">
    <h1>Pagamento com Cartão</h1>
    <p><strong>Pedido:</strong> <?= htmlspecialchars($pedidoId) ?></p>
    <p><strong>Valor:</strong> R$ <?= number_format((float) $valorTotal, 2, ',', '.') ?></p>
    <p><strong>Status:</strong> <?= $mensagem ?></p>
    <a href="Todos.html">Voltar para loja</a>
  </div>
</body>

</html>