  // Menu hambúrguer mobile
  const toggleButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-center'); // corrigido para .menu-center

  toggleButton?.addEventListener('click', () => {
    menu?.classList.toggle('active');
  });

  // Ajustar espaçamentos para header fixo, footer fixo e barra de info
  function ajustarEspacamento() {
    const header = document.getElementById("header");
    const infoBar = document.getElementById("infoBar");
    const footer = document.getElementById("footer");
    const pageWrapper = document.getElementById("page-wrapper");

    const alturaHeader = header ? header.offsetHeight : 0;
    const alturaInfoBar = infoBar ? infoBar.offsetHeight : 0;
    const alturaFooter = footer ? footer.offsetHeight : 0;

    if (infoBar && header) {
      infoBar.style.top = alturaHeader + "px";
    }

    if (pageWrapper) {
      pageWrapper.style.paddingTop = (alturaHeader + alturaInfoBar) + "px";
      pageWrapper.style.paddingBottom = alturaFooter + "px";
    }
  }

  ajustarEspacamento();
  window.addEventListener("resize", ajustarEspacamento);

  // Troca de imagens do produto (carousel)
  function switchImage(index, dotElement) {
    const container = dotElement.closest('.product-image-container');
    const images = container.querySelectorAll('.product-img');
    const dots = container.querySelectorAll('.dot');

    images.forEach(img => img.classList.remove('active'));
    images[index - 1].classList.add('active');

    dots.forEach(dot => dot.classList.remove('active'));
    dotElement.classList.add('active');
  }
  window.switchImage = switchImage; // para poder ser chamada no HTML inline

  // Verifica se usuário está logado via variável global isLoggedIn (definida pelo PHP)
  if (typeof isLoggedIn !== 'undefined' && isLoggedIn) {
    const btnPerfil = document.getElementById('btnPerfil');
    const modalPerfil = document.getElementById('modalPerfil');
    const btnFecharModal = document.getElementById('btnFecharModal');

    if (btnPerfil && modalPerfil && btnFecharModal && cartOverlay) {
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
    }
  }

  // Ajusta variáveis CSS para altura do topo e rodapé do modal perfil
  function ajustarAlturasModalPerfil() {
    const topBar = document.querySelector('.top-bar');
    const faixaAviso = document.querySelector('.faixa-aviso');
    const rodape = document.querySelector('.rodape');

    if (!topBar || !rodape || !faixaAviso) return;

    const alturaTopBar = topBar.offsetHeight;
    const alturaAviso = faixaAviso.offsetHeight;
    const alturaRodape = rodape.offsetHeight;

    const alturaTopoTotal = alturaTopBar + alturaAviso;

    document.documentElement.style.setProperty('--altura-top-bar', `${alturaTopoTotal}px`);
    document.documentElement.style.setProperty('--altura-rodape', `${alturaRodape}px`);
  }
  window.addEventListener('load', ajustarAlturasModalPerfil);
  window.addEventListener('resize', ajustarAlturasModalPerfil);

/// Função para alternar a visibilidade da aba lateral
function alternarMenu() {
  var menu = document.getElementById("menu-lateral");
  menu.classList.toggle("aberto");

  // Ao abrir o menu, esconder a frase "Sua Localização" e a seta
  if (menu.classList.contains("aberto")) {
    document.getElementById("texto-localizacao").style.display = 'none';
    document.getElementById("seta").style.display = 'none';
  } else {
    document.getElementById("texto-localizacao").style.display = 'block';
    document.getElementById("seta").style.display = 'inline';
  }
}

// Função para selecionar a localização e exibir o nome da unidade
function selecionarLocalizacao(nomeLocal) {
  var textoLocalizacao = document.getElementById("texto-localizacao");
  var seta = document.getElementById("seta");

  // Substituir o texto "Sua Localização" pelo nome da unidade
  textoLocalizacao.textContent = nomeLocal;

  // Esconder a seta após a seleção da unidade
  seta.style.display = 'none';

  // Fechar a aba lateral após selecionar uma unidade
  alternarMenu();
}
