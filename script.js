const inputBox = document.getElementById("list-content");
const list = document.getElementById("list-container");

function add() {
  const task = inputBox.value.trim();
  if (task === "") {
    alert("Enter a valid task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${task}</span>
    <div class="actions">
      <button onclick="toggleComplete(this)">✔️</button>
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;
  list.appendChild(li);
  inputBox.value = "";
  save();
}

function toggleComplete(button) {
  const li = button.closest("li");
  li.classList.toggle("completed");
  save();
}

function editTask(button) {
  const li = button.closest("li");
  const textSpan = li.querySelector(".task-text");
  const currentText = textSpan.innerText;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input");

  input.addEventListener("blur", () => {
    textSpan.innerText = input.value;
    textSpan.style.display = "inline";
    input.remove();
    save();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  });

  textSpan.style.display = "none";
  li.insertBefore(input, li.firstChild);
  input.focus();
}

function deleteTask(button) {
    const li = button.closest("li");
    li.classList.add("fadeOut");
    li.addEventListener("animationend", () => {
      li.remove();
      save();
    });
  }  

function save() {
  localStorage.setItem("data", list.innerHTML);
}

function show() {
  list.innerHTML = localStorage.getItem("data") || "";
}

show();
