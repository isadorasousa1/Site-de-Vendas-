<?php
$host = '127.0.0.1'; // Endereço do servidor de banco de dados
$db = 'senhac'; // Nome do banco de dados
$user = 'root'; // Nome de usuário para acessar o banco de dados
$pass = ''; // Senha do usuário do banco de dados
$charset = 'utf8mb4'; // Conjunto de caracteres usado na conexão

// Data Source Name (DSN) contendo as informações necessárias para conectar ao 
//banco de dados
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Opções de configuração para a conexão PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, 
    // Configura o PDO para lançar exceções em caso de erros
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, 
    // Define o modo de busca padrão para array associativo
    PDO::ATTR_EMULATE_PREPARES   => false, 
    // Desativa a emulação de prepared statements
];

try {
    // Tenta criar uma nova instância da classe PDO, estabelecendo a conexão com
    // o banco de dados
    $pdo = new PDO($dsn, $user, $pass, $options);
    // echo "<h2>Conexão bem-sucedida!</h2>"; // Mensagem exibida se a conexão for bem-sucedida
} catch (PDOException $e) {
    // Captura qualquer exceção lançada durante a tentativa de conexão
    echo "<h2>Falha na conexão: " . $e->getMessage() . "</h2>"; 
    // Mensagem exibida em caso de erro, seguida pela mensagem de erro específica
}
?>