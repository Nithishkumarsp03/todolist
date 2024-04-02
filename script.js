const inputBox = document.getElementById("list-content");
const list = document.getElementById("list-container");

function add() {
    if (inputBox.value === '') {
        alert("ENTER A VALID TASK !!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = " \u00d7 ";
        li.appendChild(span);
    }
    inputBox.value = "";
    save();
}

list.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        save();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        save();
    }
}, false);

function save() {
    localStorage.setItem("data", list.innerHTML);
}

function show() {
    list.innerHTML = localStorage.getItem("data");
}

show();
