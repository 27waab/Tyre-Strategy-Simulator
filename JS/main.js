// Variale
const allCircuts = document.querySelector(".circuts");

// Circuts From JSON
let myReq = new XMLHttpRequest();
myReq.open("GET", "JS/circuits.json");
myReq.send();
myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
        let jsData = JSON.parse(this.responseText);
        jsData.forEach(e => {
            const boxDiv = document.createElement("div");
            boxDiv.classList.add("boxOfCircuts");
            boxDiv.dataset.circuts = e.id;
            boxDiv.innerHTML = `
                <div class="before-color" style="background-color: ${e.themeColors[0]};"></div>
                <div class="after-color" style="background-color: ${e.themeColors[1]};"></div>
                <div class="box">
                    <img src="${e.flag}" alt="Japan_Flag" />
                    <h3>حلبة ${e.name}</h3>
                    <div class="info">
                            <p>${e.year}</p>
                            <p>${e.length_km} km - ${e.laps} لفة</p>
                            <p>التوقفات في السباق: ${e.estimatedStops}</p>
                    </div>
                </div>
            `;
            allCircuts.appendChild(boxDiv);
        });
    }
}
