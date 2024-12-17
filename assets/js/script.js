const mainImg = document.getElementById("mainImg");
const thumbImgs = document.querySelectorAll(".thumbImg");
const shoesInput = document.getElementById("shoesInput");
const changeVal = document.querySelectorAll(".changeVal");
const cartBtn = document.querySelector("#cardBtn");
const shoesCount = document.querySelector("#shoesCount");
const basket = document.querySelector("#basket");
const cart = document.querySelector("#cart");
const lightBigImg = document.querySelector("#lightBigImg");
const closeBtn = document.querySelector("#closeBtn");
const lightBox = document.querySelector("#lightBox");
const lightThumbImgs = document.querySelectorAll(".lightThumbImg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const navItems = document.querySelectorAll(".navItems");
const quantity = document.querySelector(".quantity");
const basketContainer = document.querySelector(".basketContainer");
let isBasketOpen = false;
let isBasketEnabled = false;
let currThumb = 0;
shoesInput.value = 0;
let activeNav = "navFirst";

const imgSource = ["./assets/images/image-product-1.jpg","./assets/images/image-product-2.jpg","./assets/images/image-product-3.jpg","./assets/images/image-product-4.jpg"];

//for updating images
thumbImgs.forEach(thumbImg => {
    thumbImg.addEventListener("click", (click) => {
        removeActive(currThumb,"active"); // No need to subtract '0'
        currThumb = parseInt(click.target.dataset.id); // Use dataset to get data-id
        mainImg.src = imgSource[currThumb];
        lightBigImg.src = imgSource[currThumb];
        addActive(currThumb,"active");
    });
});

lightThumbImgs.forEach(lightThumbImg => {
    lightThumbImg.addEventListener("click",click=>{
        removeActive(currThumb,"active");
        currThumb = parseInt(click.target.dataset.id);
        mainImg.src = imgSource[currThumb];
        lightBigImg.src = imgSource[currThumb];
        addActive(currThumb,"active")
    })
})

function addActive(val,active) {
    document.querySelectorAll(`[data-id="${val}"]`).forEach(img => {
        img.parentNode.classList.add(active);
    });
}

function removeActive(val,active) {
    document.querySelectorAll(`[data-id="${val}"]`).forEach(img => {
        img.parentNode.classList.remove(active);
    });
}

cart.addEventListener("click",(click)=>
{
    if(isBasketOpen)
    {
        basket.style.display = "none";
        isBasketOpen=false;
    }
    else
    {
        basket.style.display="block";
        isBasketOpen = true;
    }
})

changeVal.forEach((btn)=>{
    btn.addEventListener("click",(click)=>{
        let val = parseInt(shoesInput.value);
        if(click.target.id === "sub")
        {
            if(val != 0)
            {
                shoesInput.value = --val;
            }
        }
        else
        {
            shoesInput.value = ++val;
        }
    })
})

cartBtn.addEventListener("click",(click)=>
{
    let val = parseInt(shoesInput.value);
    let innerVal = parseInt(shoesCount.innerHTML);
    if(innerVal+val != 0)
    {
        isBasketEnabled = true;
        shoesCount.innerHTML = innerVal + val;
        basketContainer.innerHTML = `<div class="addedProduct">
                                        <div class="prodImage">
                                            <img src="./assets/images/image-product-1-thumbnail.jpg" alt="">
                                        </div>
                                        <div class="prodTitle">
                                            <p>Fall Limited Addition Sneakers</p>
                                            <p class="quantity">$125.00 X ${innerVal+val} <span class="result">$${125*(innerVal+val)}.00</span></p>
                                        </div>
                                        <div class="deleteIcon">
                                            <img src="./assets/images/icon-delete.svg" class="deleteIconImg" onclick="remove()" alt="">
                                        </div>
                                    </div>
                                    <div class="checkOut">
                                        <button type="button">Checkout</button>
                                    </div>`
        shoesCount.style.visibility = "visible";
        shoesInput.value = 0;
    }
    else
    {
        basketContainer.innerHTML = "<p>Your cart is empty.</p>";
        shoesCount.style.visibility = "hidden";
        shoesCount.innerHTML=0;
    }
})

mainImg.addEventListener("click",(click)=>
{
    lightCurrThumb = currThumb;
    lightBigImg.src = mainImg.src;
    lightBox.style.display = "block";
})

closeBtn.addEventListener("click",(click)=>
{
    lightBox.style.display = "none";
})

nextBtn.addEventListener("click",click => {
    if(currThumb < imgSource.length-1)
    {
        removeActive(currThumb,"active");
        mainImg.src = imgSource[++currThumb];
        lightBigImg.src = imgSource[currThumb];
        addActive(currThumb,"active")
    }
})

// nextBtn.addEventListener("click",click => {
   
//         removeActive(currThumb,"active");
//         mainImg.src = imgSource[(++currThumb)%imgSource.length];
//         lightBigImg.src = imgSource[currThumb%imgSource.length];
//         addActive(currThumb,"active")
// })


prevBtn.addEventListener("click",click => {
    if(currThumb > 0)
    {
        removeActive(currThumb,"active");
        mainImg.src = imgSource[--currThumb];
        lightBigImg.src = imgSource[currThumb];
        addActive(currThumb,"active")
    }
})

navItems.forEach(navItem => {
    navItem.addEventListener("click",click => {
        document.getElementById(activeNav).classList.remove("navActive");
        activeNav = click.target.id;
        document.getElementById(activeNav).classList.add("navActive");
        document.querySelector("ul").style.left = "-100%";
    })
})


document.querySelector(".menuIcon").addEventListener("click",click => {
    document.querySelector("ul").style.left = 0;
})

function remove(){
    shoesCount.innerHTML=0;
    basketContainer.innerHTML = "<p>Your cart is empty.</p>";
    shoesCount.style.visibility = "hidden";
}

function removeBasket(){
    console.log("hi")
    basket.style.display = "none";
    isBasketOpen=false;
}
