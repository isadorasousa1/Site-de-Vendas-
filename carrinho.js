// script.js

const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');

openCartBtn.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
});

// Inicializa o carrinho
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Atualiza o localStorage
function salvarCarrinho() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const addToCartButtons = document.querySelectorAll('.product button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', event => {
    const product = event.target.closest('.product');
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.querySelector('p').textContent.replace('R$ ', '').replace(',', '.'));
    const img = product.querySelector('img').getAttribute('src');

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }

    renderCart();
  });
});

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function updateCartTotalDisplay(total) {
  const totalSpan = document.getElementById('cartTotalValue');
  if (totalSpan) {
    totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
  }
}

function renderCart() {
  const cartBody = document.querySelector('.cart-body');
  cartBody.innerHTML = '';

  if (cart.length === 0) {
    cartBody.innerHTML = '<p>Seu carrinho está vazio.</p>';
    updateCartTotalDisplay(0);
    return;
  }

  const ul = document.createElement('ul');
  let totalGeral = 0;

  cart.forEach((item, index) => {
    const totalItem = item.price * item.quantity;
    totalGeral += totalItem;

    const li = document.createElement('li');
    li.className = 'cart-item';

    li.innerHTML = `
      <div class="cart-item-content">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img" style="width: 60px;">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>R$ ${item.price.toFixed(2)} (Total: R$ ${totalItem.toFixed(2)})</p>
          <div class="quantity-control">
            <button onclick="updateQuantity(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;

    ul.appendChild(li);
  });

  cartBody.appendChild(ul);

  // Seletor de retirada
  const retiradaLabel = document.createElement('label');
  retiradaLabel.textContent = 'Período de Retirada';
  const retiradaSelect = document.createElement('select');
  retiradaSelect.id = 'retiradaSelect';
  retiradaSelect.innerHTML = `
    <option value="manhã">Manhã</option>
    <option value="tarde">Tarde</option>
    <option value="noite">Noite</option>
  `;
  cartBody.appendChild(retiradaLabel);
  cartBody.appendChild(retiradaSelect);

  // Seletor de pagamento
  const pagamentoLabel = document.createElement('label');
  pagamentoLabel.textContent = 'Forma de Pagamento';
  const pagamentoSelect = document.createElement('select');
  pagamentoSelect.id = 'pagamentoSelect';
  pagamentoSelect.innerHTML = `
    <option value="pix">PIX</option>
    <option value="cartao">Cartão de Crédito/Débito</option>
  `;
  cartBody.appendChild(pagamentoLabel);
  cartBody.appendChild(pagamentoSelect);

  // Total do carrinho
  const totalFinal = document.createElement('p');
  totalFinal.className = 'cart-total';
  totalFinal.textContent = `Total do Pedido: R$ ${totalGeral.toFixed(2)}`;
  cartBody.appendChild(totalFinal);

  updateCartTotalDisplay(totalGeral);

// Botão de finalizar pedido com classe CSS estilizada
const finalizarBtn = document.createElement('button');
finalizarBtn.textContent = 'Finalizar Pedido';
finalizarBtn.className = 'finalizar-btn';
finalizarBtn.addEventListener('click', () => {
const retirada = document.getElementById('retiradaSelect').value;
const pagamento = document.getElementById('pagamentoSelect').value;
finalizarPedido(retirada, pagamento);
});
cartBody.appendChild(finalizarBtn);
}

function finalizarPedido(retirada, pagamento) {
  const pedidoId = 'PED' + Date.now().toString().slice(-6);
  const totalPedido = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const pedido = {
    id: pedidoId,
    data: new Date().toLocaleString(),
    itens: cart.map(item => ({
      nome: item.name,
      quantidade: item.quantity,
      valorUnitario: item.price,
      total: item.price * item.quantity
    })),
    retirada,
    pagamento,
    total: totalPedido
  };

  // Salva pedido completo no histórico
  const historico = JSON.parse(localStorage.getItem('historicoPedidos')) || [];
  historico.push(pedido);
  localStorage.setItem('historicoPedidos', JSON.stringify(historico));

  // Também salva versão resumida em meusPedidos para exibição
  const meusPedidos = JSON.parse(localStorage.getItem('meusPedidos')) || [];
  meusPedidos.push({
    codigo: pedido.id,
    itens: pedido.itens.map(i => `${i.nome} (x${i.quantidade})`),
    total: pedido.total.toFixed(2)
  });
  localStorage.setItem('meusPedidos', JSON.stringify(meusPedidos));

  if (pagamento === 'cartao') {
    redirecionarParaPagamentoCartao(pedidoId, totalPedido);
  } else {
    window.location.href = `pedido.html?id=${pedidoId}`;
  }
}

function redirecionarParaPagamentoCartao(pedidoId, total) {
// Remove o modal anterior se existir
const antigoModal = document.getElementById('cartaoModal');
if (antigoModal) antigoModal.remove();

// Criar o overlay escuro
const overlay = document.createElement('div');
overlay.id = 'cartaoModalOverlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.background = 'rgba(0, 0, 0, 0.5)';
overlay.style.zIndex = '9998';
document.body.appendChild(overlay);

// Criar o modal principal
const modal = document.createElement('div');
modal.id = 'cartaoModal';
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.left = '50%';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.background = '#fff';
modal.style.padding = '30px';
modal.style.borderRadius = '12px';
modal.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
modal.style.zIndex = '9999';
modal.style.width = '90%';
modal.style.maxWidth = '400px';

// Botão de fechar
const closeButton = document.createElement('button');
closeButton.innerHTML = '×';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.right = '15px';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.fontSize = '24px';
closeButton.style.cursor = 'pointer';
closeButton.addEventListener('click', () => {
  modal.remove();
  overlay.remove();
});

// Criar o formulário com estilo
const form = document.createElement('form');
form.method = 'POST';
form.action = 'pagamento_cartao.php';
form.innerHTML = `
  <h2 style="text-align:center; margin-bottom: 20px;">Pagamento com Cartão</h2>

  <label style="display:block; margin-bottom:10px;">
    Nome no Cartão:
    <input type="text" name="nome" required style="width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; margin-top:4px;">
  </label>

  <label style="display:block; margin-bottom:10px;">
    Número do Cartão:
    <input type="text" name="numero" maxlength="16" required style="width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; margin-top:4px;">
  </label>

  <label style="display:block; margin-bottom:10px;">
    Validade:
    <input type="text" name="validade" placeholder="MM/AA" required style="width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; margin-top:4px;">
  </label>

  <label style="display:block; margin-bottom:20px;">
    CVV:
    <input type="text" name="cvv" maxlength="4" required style="width:100%; padding:8px; border-radius:6px; border:1px solid #ccc; margin-top:4px;">
  </label>

  <input type="hidden" name="pedidoId" value="${pedidoId}">
  <input type="hidden" name="valorTotal" value="${total.toFixed(2)}">

  <button type="submit" class="finalizar-btn" style="width:100%; padding:10px; font-size:16px;">Pagar R$ ${total.toFixed(2)}</button>
`;

modal.appendChild(closeButton);
modal.appendChild(form);
document.body.appendChild(modal);
}

function confirmarPedido(event) {
event.preventDefault();

const codigo = "PED" + Math.floor(Math.random() * 100000);
const itens = []; // você pode puxar do seu carrinho
const total = 123.45; // substituir pelo valor real

const pedido = {
  codigo: codigo,
  itens: itens,
  total: total
};

let pedidos = JSON.parse(localStorage.getItem("meusPedidos") || "[]");
pedidos.push(pedido);
localStorage.setItem("meusPedidos", JSON.stringify(pedidos));

window.location.href = `confirmacao.html?codigo=${codigo}`;
}

// Seleciona os elementos
const openModalButton = document.getElementById('openPaymentModal');
const closeModalButton = document.getElementById('closePaymentModal');
const paymentModal = document.getElementById('paymentModal');

// Função para abrir o modal
openModalButton.addEventListener('click', () => {
paymentModal.style.display = 'flex';
});

// Função para fechar o modal
closeModalButton.addEventListener('click', () => {
paymentModal.style.display = 'none';
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
if (event.target === paymentModal) {
  paymentModal.style.display = 'none';
}
});

// Renderiza carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});


