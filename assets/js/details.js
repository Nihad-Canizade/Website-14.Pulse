let id = new URLSearchParams(window.location.search).get("id");
let sec5Boxs = document.querySelector('.sec5-boxs');


fetch(`http://localhost:3000/boxs/${id}`)
    .then(res => res.json())
    .then(data => {
        sec5Boxs.innerHTML += `
    <div class="sec5-box">
        <p class="sec5-box-p1">${data.name}</p>
        <p class="sec5-box-p2">${data.description}</p>
        <p class="sec5-box-p3">$${data.price}.00</p>
    </div>
    `
    });