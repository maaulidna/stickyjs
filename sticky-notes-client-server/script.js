function randomColor() {
  const colors = ["#FFF8B5", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#A0C4FF", "#BDB2FF"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function loadNotes() {
  fetch("server.php")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("notesContainer");
      container.innerHTML = "";
      data.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";
        div.style.backgroundColor = note.color || randomColor();
        div.style.top = note.top || Math.random() * 300 + "px";
        div.style.left = note.left || Math.random() * 500 + "px";
        div.setAttribute("data-index", index);

        // Editable text
        const p = document.createElement("p");
        p.textContent = note.text;
        p.contentEditable = true;
        p.addEventListener("input", () => updateNote(index, p.textContent));
        p.addEventListener("mousedown", e => e.stopPropagation()); // biar gak ikut drag

        const btn = document.createElement("button");
        btn.textContent = "×";
        btn.onclick = () => deleteNote(index);

        div.appendChild(btn);
        div.appendChild(p);

        makeDraggable(div);
        container.appendChild(div);
      });
    });
}

function addNote() {
  const noteText = document.getElementById("noteText").value.trim();
  if (!noteText) return alert("Catatan tidak boleh kosong!");

  const note = {
    text: noteText,
    color: randomColor(),
    top: Math.random() * 300 + "px",
    left: Math.random() * 500 + "px"
  };

  fetch("server.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  }).then(() => {
    document.getElementById("noteText").value = "";
    loadNotes();
  });
}

function deleteNote(index) {
  fetch("server.php?delete=" + index, { method: "GET" }).then(() => loadNotes());
}

function updateNote(index, newText) {
  fetch("server.php", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, text: newText })
  });
}

function makeDraggable(el) {
  let offsetX, offsetY, isDown = false;

  el.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.isContentEditable) return;
    isDown = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex = 1000;
  });

  document.addEventListener("mouseup", () => {
    if (isDown) {
      const index = el.getAttribute("data-index");
      savePosition(index, el.style.top, el.style.left);
    }
    isDown = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    el.style.left = e.clientX - offsetX + "px";
    el.style.top = e.clientY - offsetY + "px";
  });
}

function savePosition(index, top, left) {
  fetch("server.php", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, top, left })
  });
}

document.getElementById("addNote").addEventListener("click", addNote);
window.onload = loadNotes;
