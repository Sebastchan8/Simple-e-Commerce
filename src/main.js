let shop = document.getElementById("shop");

//localStorage.clear();

var cart = JSON.parse(localStorage.getItem("data")) || [];
var itemQuantity = JSON.parse(localStorage.getItem("quantity")) || [];
var amount = localStorage.getItem("data") != null ?
            JSON.parse(localStorage.getItem("data")).length : 0;
document.getElementById("cartAmount").innerHTML = amount;

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      return `
      <div id=product-id-${x.id} class="item">
      <img width="220" src=${x.img} alt="">
      <div class="details">
        <h3>${x.name}</h3>
        <div class="price-quantity">
          <h2>$ ${x.price}</h2>
          <div class="buttons">
            <a class="` + isActive(x.id) + `" id="${x.id}">
              <i onclick="addToCart(
                convertToObject(
                  '${x.id}', '${x.name}', 
                  '${x.desc}', ${x.price}, '${x.img}'))" 
                  class="fa fa-cart-plus"></i>
            </a>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join(""));
};

function convertToObject(id, name, desc, price, img){
  return JSON.stringify({id:id, name:name, desc:desc, price:price, img:img});
}

function isActive(id){
  if(localStorage.getItem("data") != null){
    if(cart.find((x) => x.id == id) === undefined)
      return "black";
    else
      return "not-active";
  }else
    return "black";
}

generateShop();

let addToCart = (selectedItem) => {
  selectedItem = JSON.parse(selectedItem);
  if(cart.find((x) => x.id == selectedItem.id) === undefined){
    amount = cart.push(selectedItem);
    document.getElementById(selectedItem.id).className = "not-active";
    itemQuantity.push({id:selectedItem.id, price:selectedItem.price, q:1});
    localStorage.setItem("quantity", JSON.stringify(itemQuantity));
  }else
    alert("Ya está en el carrito");
  document.getElementById("cartAmount").innerHTML = amount;
  localStorage.setItem("data", JSON.stringify(cart));
}