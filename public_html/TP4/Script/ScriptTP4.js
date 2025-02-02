document.addEventListener("DOMContentLoaded", function () {

    const copyButtons = document.querySelectorAll('.copy-button');


    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.exemple').querySelector('code');
            const codeText = codeBlock.innerText;


            navigator.clipboard.writeText(codeText).then(() => {
                console.log('Code copié dans le presse-papiers !'); // Optionnel : log de confirmation
            }).catch(err => {
                console.error('Erreur lors de la copie : ', err);
            });
        });
    });
});


function openPopup(imageElement) {
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');
    popupImage.src = imageElement.src;
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function generateToc(containerId, headers) {
    const toc = document.getElementById(containerId);
    const headerElements = document.querySelectorAll(headers.join(','));
    const list = document.createElement('ul');

    headerElements.forEach(header => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = header.textContent;
        link.href = `#${header.id || header.textContent.replace(/\s+/g, '-').toLowerCase()}`;
        header.id = header.id || link.href.split('#')[1];
        listItem.appendChild(link);
        list.appendChild(listItem);
    });

    toc.innerHTML = '<a href="/index.html" > <h4>&#8962; go home</h3> </a><br><strong>Sommaire :</strong>';
    toc.appendChild(list);
}

