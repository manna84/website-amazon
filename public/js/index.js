const cartBtn = document.getElementById('cart-btn');

cartBtn.addEventListener('click',() => {
    document.getElementById("section-cart").innerHTML = `<div class= "finish-box"><img src="/img/like.svg" class="like-img" alt="like"><br><h1>Your order is placed</h1><div>`;
    event.preventDefault();
})