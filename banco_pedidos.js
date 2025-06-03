// banco_pedidos.js

/**
 * Armazena um pedido no banco local "meusPedidos" no localStorage.
 * Deve ser chamado após o pedido ser finalizado no carrinho.
 */
function salvarPedidoEmMeusPedidos(pedidoFinalizado) {
    if (!pedidoFinalizado || !pedidoFinalizado.id) return;
  
    const meusPedidos = JSON.parse(localStorage.getItem('meusPedidos')) || [];
  
    const novoPedido = {
      codigo: pedidoFinalizado.id,
      data: pedidoFinalizado.data,
      itens: pedidoFinalizado.itens.map(item => `${item.nome} (x${item.quantidade})`),
      total: pedidoFinalizado.total.toFixed(2),
      retirada: pedidoFinalizado.retirada,
      pagamento: pedidoFinalizado.pagamento
    };
  
    meusPedidos.push(novoPedido);
    localStorage.setItem('meusPedidos', JSON.stringify(meusPedidos));
  }
  
 // Após salvar no localStorage
localStorage.setItem('pedidoFinalizado', JSON.stringify(pedido));

// Limpar carrinho
cart.length = 0;  // esvazia o array
renderCart();     // atualiza a interface