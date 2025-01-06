let continueShopping = document.getElementById("continue-shopping");
let cart = JSON.parse(localStorage.getItem("data")) || [];
var itemQuantity = JSON.parse(localStorage.getItem("quantity")) || [];
var amount = localStorage.getItem("data") != null ?
            JSON.parse(localStorage.getItem("data")).length : 0;
document.getElementById("cartAmount").innerHTML = amount;
const taxRate = 0.12;

let generateCartItems = () => {
  let cartItemsContainer = document.getElementById("cartItems");
  let subtotalContainer = document.getElementById("subtotal");
  let ivaContainer = document.getElementById("iva");
  let totalContainer = document.getElementById("total");

  if (cart.length !== 0) {
    cartItemsContainer.innerHTML = cart
      .map((x) => {
        return `
        <tr>
          <td><img src="${x.img}" height="150"></td>
          <td>
            <div class="cart-container">
              <div class="cart-product-title">${x.name}</div>
              <div class="cart-description">${x.desc}</div>
              <div class="cart-price">$ ${x.price}</div>
            </div>
          </td>
        </tr>
        `;
      })
      .join("");

    let subtotal = calculateSubtotal();
    let iva = calculateIVA(subtotal);
    let total = calculateTotal(subtotal, iva);

    subtotalContainer.innerText = "$ " + subtotal.toFixed(2);
    ivaContainer.innerText = "$ " + iva.toFixed(2);
    totalContainer.innerText = "$ " + total.toFixed(2);

    continueShopping.innerHTML = `
      <div class="cart-btn">
          <a href="cart.html" class="btn continue-shopping" id="btnContinueShopping">Volver al carrito</a>
          <a href="index.html" class="btn" id="endBuy">Finalizar Compra</a>
      </div>`;
      let endBuy = document.getElementById("endBuy");
      endBuy.addEventListener('click',function(){
        localStorage.clear();
      });
  } else {
    cartItemsContainer.innerHTML = `<h3>No hay productos en el carrito</h3>`;
    subtotalContainer.innerText = "";
    ivaContainer.innerText = "";
    totalContainer.innerText = "";
  }
};

let calculateSubtotal = () => {
  let subtotal = 0;
  for (let i = 0; i < itemQuantity.length; i++)
    subtotal += itemQuantity[i].price * itemQuantity[i].q;
  return subtotal;
};

let calculateIVA = (subtotal) => {
  return subtotal * taxRate;
};

let calculateTotal = (subtotal, iva) => {
  return subtotal + iva;
};

generateCartItems();
