const popupSpace = document.getElementById("popupsSpace");
const accountSettingsPopup = document.getElementById("accountSettings");
let currentlyActivePopup = "";
function openPopup(popupId) {
    popupSpace.style.display = "block";
    popupId.style.display = "block";
    document.body.style.overflow = "hidden";
    currentlyActivePopup = popupId;
}
function closePopup(popupId) {
    popupSpace.style.display = "none";
    popupId.style.display = "none";
    document.body.style.overflow = "";
    currentlyActivePopup = "";
}
function switchPopup(currentPopup, newPopup) {
    popupSpace.style.display = "block";
    newPopup.style.display = "block";
    currentPopup.style.display = "none";
    currentlyActivePopup = newPopup;
}
popupSpace.addEventListener("click", (event) => { if (event.target == popupSpace) { closePopup(currentlyActivePopup); } });



const selectors = document.querySelectorAll(".selector");
selectors.forEach(selector => {
    const reducedSelectorSpace = selector.querySelector(".reducedSelectorSpace");
    const expandedSelectorSpace = selector.querySelector(".expandedSelectorSpace");
    reducedSelectorSpace.addEventListener("click", () => {
        if (selector.classList.contains("opened")) {
            // Chiudi il selettore se aperto
            expandedSelectorSpace.style.maxHeight = 0;
            selector.classList.remove("opened");
        } else {
            // Apri il selettore se chiuso
            selectors.forEach(item => {
                // Chiudi altri selettori aperti
                if (item != selector && item.classList.contains("opened")) {
                    item.querySelector(".expandedSelectorSpace").style.maxHeight = 0;
                    item.classList.remove("opened");
                }
            });
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const scrollHeight = expandedSelectorSpace.scrollHeight + rootFontSize;
            expandedSelectorSpace.style.maxHeight = scrollHeight + "px";
            selector.classList.add("opened");
        }
    });
});