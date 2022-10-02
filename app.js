// Create rounded text
const text = document.querySelector('.textLogo p');
text.innerHTML = text.innerHTML.split("").map(
(char,i) =>
    `<span style="transform:rotate(${i * 9}deg)">${char}</span>`
).join("");

// Handle modal window
let modalWrap = null;
      const showModal = (title,des,src,roseSrc)=> {
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
      <div class="row">
        <div class="col-md-6 text-center" style='background-color: #eee'>
            <div class="rose"><img src=${roseSrc} alt=""></div>
            <img src=${src} width="30%" style='filter: drop-shadow(2px 4px 6px black);' alt="">
        </div>
        <div class="col-md-6">
          <h1 class="mt-5">${title}</h1>
          <p class="lead mt-3">${des}</p>
          <p class="fw-bold fs-4">$ 50</p>
          <div class="quantity">
            Quantity
            <input type="number" value="1" width="50%">
          </div>
          <button class="btn btn-dark mt-5">Add To Card</button>
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

