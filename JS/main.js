const allCircuts = document.querySelector(".circuts");

let myReq = new XMLHttpRequest();
myReq.open("GET", "JS/circuits.json", true);
myReq.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        try {
            let jsData = JSON.parse(this.responseText);
            jsData.forEach(e => {
                const boxDiv = document.createElement("div");
                boxDiv.classList.add("boxOfCircuts");
                boxDiv.innerHTML = `
                    <section data-circutname="${e.id}"></section>
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
        } catch (error) {
            console.error("Parsing error:", error);
        }
    } else {
        console.error("Failed to load JSON file. Status:", this.status);
    }
};
myReq.onerror = function() {
    console.error("Request error");
};
myReq.send();

allCircuts.onclick = (event) => {
    if (event.target.tagName === "SECTION") {
        window.localStorage.setItem("nameOfCircut", event.target.dataset.circutname);
        window.location.href = "start.html";
    }
}
