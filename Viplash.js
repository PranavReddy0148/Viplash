import accessKey from '/config.js';

const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const searchResult = document.querySelector('#search-result');
const showMoreBtn = document.querySelector('#show-more-btn');
const noResultMessage = document.querySelector('#noResultMessage');

let keyWord = "";
let page = 1;

async function getImages()
{
    keyWord = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if(page === 1)
    {
        searchResult.innerHTML = "";
    }

    //TODO: if no results show up
    if(data.total === 0)
    {
        noResultMessage.style.display = "block";
        showMoreBtn.style.display = "none";
    }
    else
    {
        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);    
        })
        showMoreBtn.style.display = "block";
        noResultMessage.style.display = "none";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    getImages();
})

showMoreBtn.addEventListener("click", () => {
    page++;
    getImages();
})