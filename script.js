const content = document.querySelector(".wrapper .content");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const counter = document.querySelector(".counter");
let numberOfPages;

init();

function init() {
    load(1, (res => renderList(res.results)));

    load(1, (res => {
        numberOfPages = res.info.pages;
    }));

    isButtonDisabled(nextButton, counter.textContent);
    isButtonDisabled(prevButton, counter.textContent);
}

prevButton.addEventListener("click", () => {
    let updatedCounter = --counter.textContent;
    isButtonDisabled(prevButton, counter.textContent);
    load(updatedCounter, (res => renderList(res.results)));
});

nextButton.addEventListener("click", () => {
    let updatedCounter = ++counter.textContent;
    isButtonDisabled(nextButton, counter.textContent);
    load(updatedCounter, (res => renderList(res.results)));

});

function isButtonDisabled(button, counter) {
    nextButton.disabled = false;
    prevButton.disabled = false;

    if (button === prevButton && counter <= 1) {
        button.disabled = true;
    }

    if (button === nextButton && counter >= numberOfPages) {
        button.disabled = true;
    }
}

function renderList(items) {
    const ol = document.createElement("ol");
    ol.setAttribute("start", String(counter.textContent * 20 - 19));

    for (const item of items) {
        const listElement = document.createElement("li");
        listElement.textContent = item.name;

        ol.appendChild(listElement);
    }

    content.innerHTML = "";
    content.appendChild(ol);
}

function load(pageNumber, callback) {
    fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(response.statusText));
            }
            return Promise.resolve(response);
        })
        .then(response => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch(error => console.log(error));
}
