//------------------ Create Rounded Text -----------------------//
const text = document.querySelector('.textLogo p');
text.innerHTML = text.innerHTML.split("").map(
(char,i) =>
    `<span style="transform:rotate(${i * 9}deg)">${char}</span>`
).join("");


//----------------------- Create Modal Window -------------------------//
let modalWrap = null;
const showModal = (id,title,des,src,price)=> {
  if(modalWrap !== null){
    modalWrap.remove();
  }
  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div id="item" class="modal fade" style="top: 20%;" tabindex="-1">
    <div class="modal-dialog" style="max-width: none; width: 80%;">
    <div class="modal-content text-center">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container">
          <div id=${id} class="row">
            <div class="col-md-6 text-center d-flex align-items-center justify-content-center" style='background-color: #eee'>
                <img src=${src} width="60%" style='filter: drop-shadow(2px 4px 6px #21232540);' alt="">
            </div>
            <div class="col-md-6">
              <h1 class="mt-5">${title}</h1>
              <p class="lead mt-3">${des}</p>
              <p class="fw-bold fs-4">$ ${price}</p>
                <div class="quantity">
                  Quantity
                    <div class="product-counter position-relative d-flex justify-content-center align-items-center mt-3">
                      <button id="minus" class="btn border">-</button>
                      <input type="number" value="1" min="0">
                      <button id="plus" class="btn border">+</button>
                    </div>
                </div>
              <button type="button" class="btn-light mt-5" onClick="x()">Add To Card</button>
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
const cartContent = document.getElementById('cartItems'),
      itemAlert = document.querySelector('.itemAlert'),
      basketNum = document.getElementById('basketNum'),
      cartInput = document.querySelectorAll('.cartInput'),
      cartPlus = document.getElementById('cartPlus'),
      cartPrice = document.querySelectorAll('.cart-price'),
      totalPrice = document.getElementById('total-price'),
      navTotalPrice = document.querySelector('.navTotal-price');
let cartItems = [];    
let cartItemsDetails = [];

//--- Function to add item to shopping cart
const addToCart = (id,img,title,price)=> {
  if(!cartItems.includes(id)) {
  // [Add new item as object to array]
  //cartItems.push({...id,id,title,price});
  cartItems.push(id);
  let newItem = document.createElement('div');
    newItem.innerHTML =
      `<div id=${id} class="cart-content">
        <div>
          <img src="${img}" class='cart-img' alt="">
          <div class="addToCart-counter position-relative d-flex justify-content-center align-items-center mt-3">
            <button class="cart-minus btn border">-</button>
            <input class='inputCart' type="number" value="1" min="0">
            <button class="cartPlus btn border">+</button>
          </div>
        </div>
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div><span>$</span>
        </div>
        <!--Remove a product from cart-->
        <i class="fa-solid fa-trash cart-remove" onclick='removeItem(this)'></i>
      </div>`
    cartContent.append(newItem);
    cartItemsDetails.push({...id,id,title,price});
    //[popup Alert box when add new item to the cart]
    itemAlert.classList.add('show');
    setTimeout(() => {
      itemAlert.classList.remove('show');
    }, 2000);
    //[Increase the number of cart items in basket]
    ++basketNum.innerHTML; 
  } else {
    //[popup Alert when choose the same item twice]
    Swal.fire('You are already add this item to cart, Increase Your Product Quantity')
    return false;
  }
  updateTotal();
}
console.log(cartItems);
console.log(cartItemsDetails);

//--- Function to remove item from shopping cart
const removeItem = (e)=> {
  let delItem = cartItems.indexOf(e.parentElement.id).toString();
  cartItems.splice(delItem,1);
   e.parentElement.remove();
   updateTotal();
   //[Decrease the number of cart items in basket]
   --basketNum.innerHTML; 
}

//--- Function to Handle Total Price 
const updateTotal = ()=> {
  const currency = `<span>$</span>`
  let num= [];
  if (cartContent.children.length > 0) {
    cartPrice.forEach(cart => {
      //[Use Math.floor to change string value to number]
      num.push(Math.floor(cart.innerHTML)); 
      console.log(num);
    })
  }
  totalPrice.innerHTML = num.reduce((prev,curr)=> prev+curr,0)+currency;
  //navTotalPrice.innerHTML = totalPrice.innerHTML;
  //HandlePopupPrice();
}

//---Function to Handle Icrease & Decrease Input Number
  //[Check if the shopping card includes items]
  if (cartContent.hasChildNodes()) {
    let inputCart = document.querySelector('.inputCart');
    console.log(inputCart);
    // cartItems.forEach(cart=> {
    //   console.log(cart);
    // })
  }

//---Handle Total Price Popup 
// const pricePopup = document.getElementById('popupNavPrice');
// const HandlePopupPrice = ()=> {
//   pricePopup.classList.add('show');
//   setTimeout(()=> {
//     pricePopup.classList.remove('show');
//   },2000)
// }


//------------------------ Navbar Shopping Basket --------------------------//
const basket = document.getElementById('basket');
const cart = document.querySelector('.cart');
const menuCloseBtn = document.getElementById('menuCloseBtn');

//---Handle Open Shopping Cart
basket.addEventListener('mouseover', ()=> {
  console.log('basket hover')
  cart.classList.add('open')
});
//---Handle Close Shopping Cart
menuCloseBtn.addEventListener('click', ()=> {
  console.log('clooooooose')
  cart.classList.remove('open')
}); 

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
//const bsCollapse = new bootstrap.Collapse(menuToggle)
// const logo = document.querySelector('.logo')
//navLinks.forEach((link) => {
 // console.log('navvvvv')
 // link.addEventListener('click', () => { bsCollapse.toggle() });
//   basket.addEventListener('click', () => { bsCollapse.hide() })
//   logo.style.display = 'none'
//})


//test

