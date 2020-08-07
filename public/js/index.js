const cartBtn = document.getElementById('cart-btn');

cartBtn.addEventListener('click', () => {
    document.getElementById("section-cart").innerHTML = `<div class= "finish-box"><img src="/img/like.svg" class="like-img" alt="like"><br><h1>Your order is placed</h1><div>`;
})

function retain() {

    let x = document.getElementById('category').value;  
    console.log(x);

    if(x == "All Categories") {
        window.location.assign("/productListing")
    }

    else if(x == "Camera,photo & video") {
        window.location.assign("/change1")
    }

    else if(x == "Cell Phone & Accessories") {
        window.location.assign("/change2")
    }

    else if(x == "Headphones") {
        window.location.assign("/change3")
    }

    else if(x == "Computers & Accessories") {
        window.location.assign("/change4")
    }

    else if(x == "Portable Audio & Video") {
        window.location.assign("/change5")
    }

}
