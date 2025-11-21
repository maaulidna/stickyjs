# 📝 Sticky Notes – Client Server Web App

A simple **sticky notes web app** built using **JavaScript (client)** and **PHP (server)**.  
This project demonstrates how **client–server communication** works through HTTP requests — with the client (frontend) hosted on **Netlify**, and the backend (PHP server) hosted externally.

---

## 🚀 Features
- Add colorful sticky notes 🎨  
- Edit and delete notes easily ✏️❌  
- Random pastel colors for each note  
- Responsive and clean UI  
- Data handled via client–server request (using `fetch()`)

---

## 🧠 Concept Overview

This project applies the **Client–Server architecture**:

| Role | Technology | Description |
|------|-------------|-------------|
| **Client** | HTML, CSS, JavaScript | Runs in the browser (hosted on Netlify). Handles UI and user actions. |
| **Server** | PHP | Runs on a remote PHP host (e.g., 000webhost). Handles data processing and storage. |

Data flow example:
```

Browser (Client – Netlify)
↓  fetch()
PHP Server (Backend – 000webhost)

```

---

## 📂 Project Structure
```

sticky-notes-client-server/
├── index.html          # Main frontend (client)
├── style.css           # Styling (optional, if separated)
├── script.js           # Client logic (fetch to PHP server)
├── save_note.php       # Backend endpoint (to be uploaded to PHP host)
└── load_note.php       # Backend endpoint (to be uploaded to PHP host)

````

---

## ⚙️ How to Run Locally
1. Clone this repository:

   git clone https://github.com/username/sticky-notes-client-server.git


2. Run a local PHP server (via XAMPP, Laragon, etc.)
3. Open `http://localhost/sticky-notes-client-server/` in your browser.

---

## 🌍 Deployment Setup

### 🔸 Frontend (Client)

Deployed on **Netlify**

* Upload only your frontend files: `index.html`, `style.css`, `script.js`
* Netlify will provide your site URL, e.g.:

  ```
  https://sticky-notes-moli.netlify.app
  ```

### 🔸 Backend (Server)

Deployed on a **PHP host** (e.g., 000webhost, InfinityFree, or Hostinger)

* Upload `save_note.php` and `load_note.php`
* Get your backend URL, for example:

  ```
  https://moli-notes.000webhostapp.com/
  ```

### 🔸 Connect Frontend to Backend

Edit the API endpoints inside `script.js`:

```js
// Example
fetch('https://moli-notes.000webhostapp.com/save_note.php', {
  method: 'POST',
  body: JSON.stringify(note),
  headers: { 'Content-Type': 'application/json' }
});
```

---

## 🧰 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** PHP (running on Apache)
* **Hosting:** Netlify (client) + 000webhost (server)

---

## 🌱 Future Improvements

* Save notes permanently (file or database)
* Add drag & drop for note positioning
* Sync notes with user accounts

---

## 👩‍💻 Author

Created by Canggih Oke Kelompok 3 4KA23 Mata Kuliah Sistem Terdistribusi
🎓 Information Systems student at Gunadarma University
for client–server architecture demonstration and web development practice.

---

✨ *“Even simple notes can stick great ideas.”*

```
