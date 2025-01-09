
const accessKey = "mH-FH3VTSDEjjYFX3n6aScTigq3vagIWPzMatEMmNCA";  // Substitua pela sua chave


const searchInput = document.getElementById("search");
const gallery = document.getElementById("gallery");
const noResults = document.getElementById("no-results");


async function fetchPhotos(query = '') {
  try {
   
    const url = query
      ? `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=30`
      : `https://api.unsplash.com/photos?client_id=${accessKey}&per_page=30`;

    const response = await fetch(url);
    const data = await response.json();

    
    return data.results ? data.results : data;
  } catch (error) {
    console.error("Erro ao carregar as fotos:", error);
    return [];
  }
}


function displayPhotos(photos) {
  gallery.innerHTML = '';

  if (photos.length === 0) {
    noResults.classList.remove('hidden'); 
  } else {
    noResults.classList.add('hidden'); 
    photos.forEach(photo => {
      const photoElement = document.createElement('div');
      photoElement.classList.add('col-md-4', 'gallery-item');

      
      const photoUrl = photo.urls ? photo.urls.small : 'https://via.placeholder.com/300';
      const photoAlt = photo.alt_description || "Sem Título";
      const photographerName = photo.user ? photo.user.name : "Desconhecido";

      photoElement.innerHTML = `
        <img src="${photoUrl}" class="img-fluid" alt="${photoAlt}">
        <p class="mt-2">${photoAlt} - Foto por ${photographerName} no Unsplash</p>
      `;
      gallery.appendChild(photoElement);
    });
  }
}

searchInput.addEventListener("input", async (event) => {
  const query = event.target.value.trim().toLowerCase();
  const photos = await fetchPhotos(query);

  displayPhotos(photos);
});


(async function () {
  const photos = await fetchPhotos();
  displayPhotos(photos);
})();
