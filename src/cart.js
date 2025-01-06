let continueShopping = document.getElementById("continue-shopping");
let ShoppingCart = document.getElementById("shopping");
let priceLine = document.getElementById("price-shopping");
let label = document.getElementById("label");
let cartTitle = document.getElementById("cart-title");

let cart = JSON.parse(localStorage.getItem("data")) || [];
var itemQuantity = JSON.parse(localStorage.getItem("quantity")) || [];

var amount = localStorage.getItem("data") != null ?
            JSON.parse(localStorage.getItem("data")).length : 0;
document.getElementById("cartAmount").innerHTML = amount;

let generateCartItems = () => {
  if (cart.length !== 0) {
    ShoppingCart.innerHTML = cart
      .map((x) => {
        return `
      <tr>
        <td><img src="` + x.img + `" height="150"></td>
        <td>
            <div class="cart-container">
                <div class="cart-product-title">
                  ` + x.name + `
                </div>
                <div class="cart-description">
                  ` + x.desc + `
                </div>
                <div class="cart-price">
                  $ ` + x.price + `
                </div>
            </div>
        </td>
        <td class="cell-padding">
            <i class="fa fa-minus" onclick="decrement('` + x.id + `')"></i>
            <input type="number" min="1" max="100" 
              value="` + itemQuantity.find((y) => y.id == x.id).q + `" 
              class="text-center" readonly>
            <i class="fa fa-plus" onclick="increment('` + x.id + `')"></i>
        </td>
        <td>$` + itemPrice(x.id) + `</td>
        <td>
          <button class="delete-icon" onclick="removeItem('` + x.id + `')">
            <i class="fa fa-trash"></i>
          </button>
        </td>
    </tr>
      `;
      })
      .join("");
      cartTitle.innerHTML = `Carrito`;
      continueShopping.innerHTML = `
      <div class="cart-btn">
          <a href="index.html" class="btn continue-shopping" id="btnContinueShopping">Seguir comprando</a>
          <a href="summary.html" class="btn" id="btnBuy">Comprar</a>
      </div>`;
      /* 
      let btnBuy = document.getElementById("btnBuy");
      btnBuy.addEventListener("click", function() {
      window.location.href = "summary.html";
      }); */

      priceLine.innerHTML = `
      <p class="text-total"><b>Total:</b> $` + totalPrice() + `</p>
      `;
  } else {
    ShoppingCart.innerHTML = ``;
    priceLine.innerHTML = ``;
    cartTitle.innerHTML = ``;
    continueShopping.innerHTML = `
      <h1 class="text-center">El carrito está vacío</h1>
      <h2 class="text-center"><img src="images/box.gif" height="300"></h2>
        <div class="cart-btn">
          <a href="index.html" class="btn back-shopping" id="btnContinueShopping">Volver a la tienda</a>
      </div>`
  }
  
};

generateCartItems();

let removeItem = (selectedItem) =>{
  cart = cart.filter((x) => x.id !== selectedItem);
  itemQuantity = itemQuantity.filter((x) => x.id !== selectedItem);
  document.getElementById("cartAmount").innerHTML = cart.length;
  localStorage.setItem("data", JSON.stringify(cart));
  localStorage.setItem("quantity", JSON.stringify(itemQuantity));
  generateCartItems();
}

let increment = (selectedItem) =>{
  objIndex = itemQuantity.findIndex((obj => obj.id == selectedItem));
  itemQuantity[objIndex].q++;
  console.log(itemQuantity);
  localStorage.setItem("quantity", JSON.stringify(itemQuantity));
  generateCartItems();
}

let decrement = (selectedItem) =>{
  objIndex = itemQuantity.findIndex((obj => obj.id == selectedItem));
  if(itemQuantity[objIndex].q != 1){
    itemQuantity[objIndex].q--;
    localStorage.setItem("quantity", JSON.stringify(itemQuantity));
    generateCartItems();
  }else
    removeItem(selectedItem);
}

function itemPrice(id){
  let selectedItem = itemQuantity.find((y) => y.id == id);
  return selectedItem.price * selectedItem.q;
}

function totalPrice(){
  let sum = 0;
  for (let i = 0; i < itemQuantity.length; i++)
    sum += itemQuantity[i].price * itemQuantity[i].q;
  return sum;
}