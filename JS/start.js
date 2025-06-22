const backGroundOverlay = document.querySelector(".background-color-overlay");
const circuitName = document.querySelector("header .container");
const pitStopTime = document.querySelector("section .pitstop");
const startBtn = document.querySelector("button");
const circuitInLocalStorage = window.localStorage.getItem("nameOfCircut");

let myReq = new XMLHttpRequest();
myReq.open("GET", "JS/circuits.json", true);
myReq.onload = function () {
    if (this.status >= 200 && this.status < 300) {
        try {
            let jsData = JSON.parse(this.responseText);
            jsData.forEach(el => {
                if (el.id === circuitInLocalStorage) {
                    backGroundOverlay.innerHTML = `
                        <div class="start" style="background-color: ${el.themeColors[0]}"></div>
                        <div class="end" style="background-color: ${el.themeColors[1]}"></div>
                    `;
                    circuitName.innerHTML = `حلبة ${el.name}`;
                    for (let i = 0; i < el.estimatedStops; i++) {
                        const div = document.createElement("div");
                        div.classList.add(`pit_${i + 1}`);
                        div.innerHTML = `
                            <h3>التوقف #${i + 1}</h3>
                            <select name="pitStop_${i + 1}" id="">
                                <option value="soft">Soft</option>
                                <option value="medium">Medium</option>
                                <option value="haed">Hard</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="wet">Wet</option>
                            </select>
                        `;
                        pitStopTime.appendChild(div);
                    }
                }
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