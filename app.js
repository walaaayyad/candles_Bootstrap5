//------------------ Create Rounded Text -----------------------//
const text = document.querySelector('.textLogo p');
text.innerHTML = text.innerHTML.split("").map(
(char,i) =>
    `<span style="transform:rotate(${i * 9}deg)">${char}</span>`
).join("");


//----------------------- Create Modal Window -------------------------//
let modalWrap = null;
const showModal = (id,title,des,src,roseSrc,price)=> {
  if(modalWrap !== null){
    modalWrap.remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div id="item" class="modal fade" style="top: 20%;" tabindex="-1">
    <div class="modal-dialog" style="max-width: none; width: 80%;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div id=${id} class="row">
            <div class="col-md-6 text-center d-flex align-items-center justify-content-center" style='background-color: #eee'>
                <div class="rose"><img src=${roseSrc} alt=""></div>
                <img src=${src} width="60%" style='filter: drop-shadow(2px 4px 6px #21232540);' alt="">
            </div>
            <div class="col-md-6">
              <h1 class="mt-5">${title}</h1>
              <p class="lead mt-3">${des}</p>
              <p class="fw-bold fs-4">$ ${price}</p>
              <div class="quantity">
                Quantity
                <input type="number" value="1" width="50%">
              </div>
              <button type="button" class="btn btn-dark mt-5" onClick="x()">Add To Card</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
    </div>
    </div>
    `;
document.body.append(modalWrap);
let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
modal.show();
}
let x = ()=> {console.log('helloooo Model')};

//----------------------- Handle Hearts Clicking ------------------------//
const heart = document.querySelectorAll('.fa-regular'),
      heartNum = document.getElementById('heartNum'),
      heartBeat = document.querySelector('.navHeart');

let arr=[];
heart.forEach(i => {
  i.addEventListener('click', ()=> {
    i.classList.toggle('fa-solid');
    if(i.closest('.fa-solid')) {
      ++heartNum.innerHTML;
      heartBeat.classList.remove('beat');
      setTimeout(() => {
        heartBeat.classList.add('beat');
      }, 0);
    //  console.log(i.id);
    } else {
      --heartNum.innerHTML;
    }
    // localStorage.setItem('fav',heartNum.innerHTML);
  })
})
// heartNum.innerHTML = localStorage.getItem('fav');

//------------------- Shopping Cart ----------------------//
// const btnAddToCart = document.querySelectorAll('.btn-addToCart'),
//       cartId = document.getElementById('cartId'),
const cartContent = document.querySelector('#cartItems');
const itemAlert = document.querySelector('.itemAlert');
const basketNum = document.getElementById('basketNum')
let cartItems = [];    

//---Function to add item to shopping cart
const addToCart = (id,img,title,price)=> {
  if(!cartItems.includes(id)) {
  cartItems.push(id); // Add new item to array
  let newItem = document.createElement('div');
    newItem.innerHTML =
      `<div id=${id} class="cart-content">
        <img src="${img}" class='cart-img' alt="">
          <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
          </div>
        <!--Remove a product from cart-->
        <i class="fa-solid fa-trash cart-remove" onclick='removeItem(this)'></i>
      </div>`
    cartContent.append(newItem);
    //popup Alert box
    itemAlert.classList.add('show');
    setTimeout(() => {
      itemAlert.classList.remove('show');
    }, 2000);
    ++basketNum.innerHTML; // Increase the number of cart items in basket
  } else {
    Swal.fire('You are already add this item to cart, Increase Your Product Quantity')
    return false;
  }
  updateTotal();
}
console.log(cartItems);

//---Function to remove item from shopping cart
const removeItem = (e)=> {
  let delItem = cartItems.indexOf(e.parentElement.id).toString();
  cartItems.splice(delItem,1);
   e.parentElement.remove();
   updateTotal();
   --basketNum.innerHTML; // Decrease the number of cart items in basket
}
//---Total Price 
const shoppingCart = document.getElementById('cartItems');
const updateTotal = ()=> {
  const cartPrice = document.querySelectorAll('.cart-price');
  const totalPrice = document.querySelector('.total-price');
  const navTotalPrice = document.querySelector('.navTotal-price');
  let num= [];
  if (shoppingCart.children.length > 0) {
    cartPrice.forEach(i => {
      num.push(Math.floor(i.innerHTML)); //Use Math.floor to change string value to number
    })
  }
  totalPrice.innerHTML = num.reduce((prev,curr)=> prev+curr,0);
  navTotalPrice.innerHTML = totalPrice.innerHTML;
  HandlePopupPrice();
}

//---Handle Total Price Popup 
const pricePopup = document.getElementById('popupNavPrice');
const HandlePopupPrice = ()=> {
  pricePopup.classList.add('show');
  setTimeout(()=> {
    pricePopup.classList.remove('show');
  },2000)
}

//---Handle Open Shopping Cart
const basket = document.getElementById('basket');
const cart = document.querySelector('.cart');
basket.addEventListener('click', ()=> {
  console.log('btn clicked')
  cart.classList.toggle('active');
})


//---Handle Close Shopping Card
const menuCloseBtn = document.getElementById('menuCloseBtn');
menuCloseBtn.addEventListener('click', ()=> {
  cart.classList.add('close')
})


//----------------------- Modal2 ----------------------//
const modal2 = document.getElementById('modal2');
const modalCloseBtn = document.getElementById('modalCloseBtn');

//---Handle Close Btn
modalCloseBtn.addEventListener('click', ()=> {
  console.log('modal close btn');
  modal2.style.opacity = '0';
})

//---------------------- Navigation Menu --------------------//
//---Handle Closing Navigation Menu When Click on Link or Basket
const navLinks = document.querySelectorAll('.nav-link')
const menuToggle = document.getElementById('navbarNavDropdown')
const bsCollapse = new bootstrap.Collapse(menuToggle)
navLinks.forEach((link) => {
  link.addEventListener('click', () => { bsCollapse.toggle() })
  basket.addEventListener('click', () => { bsCollapse.hide() })
})

