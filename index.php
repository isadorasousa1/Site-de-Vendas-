<?php
session_start(); // Inicia a sessão
// Quando se inicia uma sessão, estamos preparando
// para enviar alguns parâmetros para outra página.
// Vamos enviar o id e o email do usuário para o principal.php
// Dizendo então que está logado. "Fator de segurança"
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="login.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet">

</head>

<body>
    <div class="container">
        <div class="centralizado">
            <div class="login-container">
                <img src="senhac.png" width="200px" alt="Logotipo" class="logo">

                <form action="login.php" method="post">
                    <div class="form-group">
                        <label for="email">

                        </label>
                        <i class="fa-solid fa-user"></i>
                        <input type="text" id="email" name="email" placeholder="Email ou Usuário">
                    </div>
                    <div class="form-group">
                        <label for="senha">
                        </label>
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua Senha">
                        <span class="toggle-password" onclick="togglePassword()">

                        </span>
                    </div>
                    <!-- From Uiverse.io by mobinkakei -->
                    <button class="btn">
                        <span class="btn-text-one">login</span>
                        <span class="btn-text-two">login</span>
                    </button>

            </div>
        </div>
        <script>
            function togglePassword() {
                var senha = document.getElementById("senha");
                var icon = document.querySelector(".toggle-password i");
                if (senha.type === "password") {
                    senha.type = "text";
                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");
                } else {
                    senha.type = "password";
                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");
                }
            }
        </script>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

</body>

</html>