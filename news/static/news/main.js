// CSRF token setup
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let c of cookies) {
            c = c.trim();
            if (c.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(c.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// WebSocket connection
const socket = new WebSocket('ws://' + window.location.host + '/ws/news/');

socket.onmessage = function(e) {
    const article = JSON.parse(e.data);
    const container = document.getElementById('articles');
    const div = document.createElement('div');
    div.classList.add('article');
    div.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.content}</p>
        <small>${new Date(article.created_at).toLocaleString()}</small>
    `;
    container.prepend(div);
};

// Load existing articles from API
async function loadArticles() {
    const res = await fetch('/api/articles/');
    const data = await res.json();
    const container = document.getElementById('articles');
    container.innerHTML = '';
    data.forEach(a => {
        const div = document.createElement('div');
        div.classList.add('article');
        div.innerHTML = `
            <h3>${a.title}</h3>
            <p>${a.content}</p>
            <small>${new Date(a.created_at).toLocaleString()}</small>
        `;
        container.appendChild(div);
    });
}

// Auto-generate article
async function generateArticle() {
    await fetch('/api/generate-news/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            title: "Breaking News " + Math.floor(Math.random() * 1000),
            content: "This is a live-generated article."
        })
    });
}

// Manual article creation
async function createManualArticle(title, content) {
    await fetch('/api/generate-news/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ title, content })
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Generate button
    document.getElementById('generate').addEventListener('click', generateArticle);

    // Manual form submission
    document.getElementById('manual-article-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        await createManualArticle(title, content);
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    });

    // Load articles on page load
    loadArticles();
});
