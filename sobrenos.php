<?php
session_start();
$logado = isset($_SESSION['usuario']);
$nomeUsuario = $logado ? $_SESSION['usuario']['nome'] : null;
$fotoPerfil = $logado && !empty($_SESSION['usuario']['foto']) ? $_SESSION['usuario']['foto'] : 'imagens/senhac.png'; // ajuste o caminho da imagem padrão aqui
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre Nós</title>
  <script src="JS/carrinho.js" defer></script>
  <script src="JS/senhac.js"></script>
  <script src="JS/banco_pedidos.js"></script>
  <link rel="stylesheet" href="sobrenos.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />

</head>

<body class="light-theme">
  <div id="cartSidebar">
    <div class="cart-header">
      <h2>Seu Carrinho</h2>
      <button id="closeCart" aria-label="Fechar carrinho">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="cart-body">
      <p>Seu carrinho está vazio.</p>
    </div>
  </div>

  <div id="cartOverlay"></div>

  <header class="top-bar" id="header">
    <img src="senhacl.png" alt="Logo Senhac" />
    <div class="search-user">
      <input type="text" placeholder="Buscar" />

      <?php if (!$logado): ?>
        <!-- Não logado: botão redireciona -->
        <button class="icon-button" title="Perfil" onclick="window.location.href='index2.php'">
          <i class="fas fa-user"></i>
        </button>
      <?php else: ?>
        <!-- Logado: botão abre modal -->
        <button class="icon-button" title="Perfil" id="btnPerfil">
          <i class="fas fa-user"></i>
        </button>
      <?php endif; ?>

      <button class="icon-button" id="openCart" title="Carrinho">
        <i class="fas fa-shopping-cart"></i>
      </button>
    </div>
  </header>

  <div class="faixa-aviso" id="infoBar">
    O Senhac é a plataforma que facilita o seu pedido diretamente da máquina de alimentos da instituição.
  </div>

  <div id="page-wrapper">
    <section class="banner">
      <img src="banner2.png" alt="Banner" />
      <div class="banner-overlay">
        <h2>Senhac.<br />Rápido, prático e seguro.</h2>
        <p>Você pode escolher entre lanches, bebidas e outros produtos!</p>
      </div>
    </section>

    <main class="categorias" id="mainContent">
      <a href="ofertas.html" class="categoria">
        <img src="ofertas.png" alt="Ofertas" />
        <p>Ofertas do Dia</p>
      </a>
      <a href="Bebidas.html" class="categoria">
        <img src="bebidas.png" alt="Bebidas" />
        <p>Bebidas</p>
      </a>
      <a href="Doces.html" class="categoria">
        <img src="doces.png" alt="Doces" />
        <p>Doces</p>
      </a>
      <a href="Lanches.html" class="categoria">
        <img src="lanches.png" alt="Lanches" />
        <p>Lanches</p>
      </a>
      <a href="Todos.html" class="categoria">
        <img src="todositens.png" alt="Todos os Itens" />
        <p>Todos os Itens</p>
      </a>
      <a href="meu-pedido.html" class="categoria">
        <img src="pedido.png" alt="Meus Pedidos" />
        <p>Meus Pedidos</p>
      </a>
    </main>

    <div class="app-download">
      <a href="https://play.google.com/store/apps/details?id=br.sp.senac&hl=pt_BR" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Disponível no Google Play" class="store-badge" />
      </a>
      <a href="https://apps.apple.com/br/app/senac-s%C3%A3o-paulo/id1454496991" target="_blank">
        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Disponível na App Store" class="store-badge" />
      </a>
    </div>
  </div>

  <footer class="rodape" id="footer">
    ©2025 Senac. Todos os direitos reservados.
  </footer>

  <?php if ($logado): ?>
    <!-- Modal de perfil -->
    <div id="modalPerfil" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitulo" aria-modal="true">
      <div class="modal-content">
        <button class="close-modal" id="btnFecharModal" aria-label="Fechar modal">&times;</button>
        <img src="perfil (2).png" alt="Foto de Perfil" />
        <h2 id="modalTitulo"><?= htmlspecialchars($nomeUsuario) ?></h2>
        <h4>Meus Dados</h4>
        <h4>Meus cartões</h4>
        <h4>Minhas Preferências</h4>
        <h4>Ajuda</h4>
        <form action="logout.php" method="post" style="margin-top:10px;">
          <button type="submit">Sair</button>
        </form>
      </div>
    </div>
  <?php endif; ?>

  <script>
    function ajustarEspacamento() {
      const header = document.getElementById("header");
      const infoBar = document.getElementById("infoBar");
      const footer = document.getElementById("footer");
      const pageWrapper = document.getElementById("page-wrapper");

      const alturaHeader = header?.offsetHeight || 0;
      const alturaInfoBar = infoBar?.offsetHeight || 0;
      const alturaFooter = footer?.offsetHeight || 0;

      if (infoBar) {
        infoBar.style.top = `${alturaHeader}px`;
      }

      if (pageWrapper) {
        pageWrapper.style.paddingTop = `${alturaHeader + alturaInfoBar}px`;
        pageWrapper.style.paddingBottom = `${alturaFooter}px`;
      }
    }

    window.addEventListener("load", ajustarEspacamento);
    window.addEventListener("resize", ajustarEspacamento);

    <?php if ($logado): ?>
      const btnPerfil = document.getElementById('btnPerfil');
      const modalPerfil = document.getElementById('modalPerfil');
      const btnFecharModal = document.getElementById('btnFecharModal');

      btnPerfil.addEventListener('click', () => {
        modalPerfil.classList.add('active');
        cartOverlay.classList.add('active');
        modalPerfil.setAttribute('aria-hidden', 'false');
      });

      btnFecharModal.addEventListener('click', () => {
        modalPerfil.classList.remove('active');
        cartOverlay.classList.remove('active');
        modalPerfil.setAttribute('aria-hidden', 'true');
      });

      window.addEventListener('click', (e) => {
        if (e.target === modalPerfil) {
          modalPerfil.classList.remove('active');
          cartOverlay.classList.remove('active');
          modalPerfil.setAttribute('aria-hidden', 'true');
        }
      });
    <?php endif; ?>

    function ajustarAlturasModalPerfil() {
      const topBar = document.querySelector('.top-bar');
      const faixaAviso = document.querySelector('.faixa-aviso');
      const rodape = document.querySelector('.rodape');

      if (!topBar || !rodape || !faixaAviso) return;

      const alturaTopBar = topBar.offsetHeight;
      const alturaAviso = faixaAviso.offsetHeight;
      const alturaRodape = rodape.offsetHeight;

      // Variável CSS com altura total do topo (top-bar + faixa-aviso)
      const alturaTopoTotal = alturaTopBar + alturaAviso;

      document.documentElement.style.setProperty('--altura-top-bar', `${alturaTopoTotal}px`);
      document.documentElement.style.setProperty('--altura-rodape', `${alturaRodape}px`);
    }
    window.addEventListener('load', ajustarAlturasModalPerfil);
    window.addEventListener('resize', ajustarAlturasModalPerfil);

  </script>
</body>

</html>