const apiKey = '3893ec0643c149c7b5485ea81b6aedc7';
const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=3893ec0643c149c7b5485ea81b6aedc7`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error while fetching random news",error);
        return [];
    }
}
searchButton.addEventListener('click',async() => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery (query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error while fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `
https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&sortBy=publishedAt&apiKey=3893ec0643c149c7b5485ea81b6aedc7
`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error while fetching random news",error);
        return [];
    }   
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ""
    if (articles.length === 0) {
        blogContainer.innerHTML = "<p>No articles found</p>";
        return;
    }
    articles.forEach((article)  => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = article.urlToImage || "default-image.jpg"; // Fallback if no image
        img.alt = article.title;
        const title = document.createElement("h2");
        const TruncatedTitle = article.title.length>30? article.title.slice(0,30) + "....":article.title;
        title.textContent = TruncatedTitle;
        const description = document.createElement("p");
        const Truncateddes = article.description.length>120? article.description.slice(0,120) + "....":article.description || "No description available";
        description.textContent = Truncateddes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',() => {
            window.open(article.url,"_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error while fetching random news",error);
    }
})();
