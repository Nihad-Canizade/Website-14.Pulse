// Menu icon
function myIcon(x) {
    x.classList.toggle("change");
}

// Menu icon click
let menuIcon = document.querySelector('.menu-icon');
let resNav = document.querySelector('.res-nav');
menuIcon.addEventListener('click', () => {
    if (resNav.style.display === "none") {
        resNav.style.backgroundColor = "black";
        resNav.style.display = "flex";
    } else {
        resNav.style.backgroundColor = "";
        resNav.style.display = "none";
    }
});


// Slide Show
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


// Get data Api
let sec5Boxs = document.querySelector('.sec5-boxs');
let search = document.querySelector("input[type=search]");
let sort = document.getElementById("sort");
let info = [];

function getDataApi() {
    fetch("http://localhost:3000/boxs")
        .then(response => response.json())
        .then(data => {
            sec5Boxs.innerHTML = "";
            info = info.length ? info : data;
            info.forEach(element => {
                sec5Boxs.innerHTML += `
                <div class="sec5-box">
                <div class = "sec5-icons">
                <a href="./details.html?id=${element.id}" target="_blank"><i class="bi bi-eye"></i></a>
                <i class = "bi bi-cart-plus" onclick="addBasket(${element.id})"></i>
                <i class = "bi bi-heart-fill"></i>
                </div>
                <p class="sec5-box-p1">${element.name}</p>
                <p class="sec5-box-p2">${element.description}</p>
                <p class="sec5-box-p3">$${element.price}.00</p>
            </div>`
            });

            // Sort functions
            sort.addEventListener('change', (e) => {
                if (e.target.value == 'descending') {
                    info = info.sort((a, b) => b.price - a.price);
                } else if (e.target.value == "ascending") {
                    info = info.sort((a, b) => a.price - b.price);
                } else {
                    info = [];
                }
                getDataApi();
            });

            // Search function
            search.addEventListener("input", (e) => {
                let filter = data.filter((el) => {
                    return el.name.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase());
                });
                sec5Boxs.innerHTML = "";
                filter.forEach(element => {
                    sec5Boxs.innerHTML += `
                    <div class="sec5-box">
                    <div class = "sec5-icons">
                    <a href="./details.html?id=${element.id}" target="_blank"><i class="bi bi-eye"></i></a>
                    <i class = "bi bi-cart-plus" onclick="addBasket(${element.id})"></i>
                    <i class = "bi bi-heart-fill"></i>
                    </div>
                    <p class="sec5-box-p1">${element.name}</p>
                    <p class="sec5-box-p2">${element.description}</p>
                    <p class="sec5-box-p3">$${element.price}.00</p>
                </div>`
                })
            })
        })
}

getDataApi();