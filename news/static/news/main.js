async function loadArticles() {
  try {
    const res = await fetch('/articles/');
    if (!res.ok) throw new Error('Failed to load articles');
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
  } catch (error) {
    console.error(error);
  }
}

async function generateArticle() {
  try {
    const res = await fetch('/generate-news/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Auto News " + Math.floor(Math.random() * 1000),
        content: "This article was generated automatically."
      })
    });

    if (!res.ok) throw new Error('Failed to generate article');
    await loadArticles();
  } catch (error) {
    console.error(error);
  }
}


function startPolling() {
  loadArticles();
  setInterval(loadArticles, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generate');
  if (generateBtn) generateBtn.addEventListener('click', generateArticle);

  startPolling();
});
