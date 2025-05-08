new Vue({
    el: '#app',
    data: {
        // The structure of the elements of the list will be like this:
        // (title, author, instrument, type, src) 
        // The type can be 'warmUp' or 'study' and if it is both will be empty ''
        // The src will be the path to the pdf file, it can be from internet or local
        pdfList: [
            ['Asturias', 'Isaac Albéniz', 'Piano', 'study', 'library/Albéniz - Asturias (pianoforte).pdf'],
            ['Decamerón Negro', 'Leo Brouwer', 'Guitarra', 'warmUp', 'library/Brouwer, L. - Decamerón Negro.pdf'],
            ['Capriccio Diabolico', 'Mario Castelnuovo-Tedesco', 'Guitarra', '', 'library/Capriccio Diabolico - Mario Castelnuovo-Tedesco.pdf'],
            ['Capriccio Nº 24', 'Niccolò Paganini', 'Violí', 'study', 'library/Capriccio Nº 24 - Niccolò Paganini.pdf'],
            ['Clair de lune', 'Claude Debussy', 'Piano', 'warmUp', 'library/Claude Debussy - Clair de lune.pdf'],
            ['Nocturne op.9 No.2', 'Frédéric Chopin', 'Piano', '', 'library/Frédéric Chopin - Nocturne op.9 No.2.pdf'],
            ['Kanon', 'Johann Pachelbel', 'Orgue', 'study', 'library/Johann Pachelbel - Kanon.pdf'],
            ['La Campanella', 'Franz Liszt', 'Piano', '', 'library/La Campanella - Franz Liszt.pdf'],
            ['Vol del Borinot', 'Nikolái Rimski-Kórsakov', 'Violí', 'warmUp', 'library/Nikolái Rimski-Kórsakov - Flight of the Bumblebee.pdf'],
            ['The Entertainer', 'Scott Joplin', 'Piano', 'study', 'library/Scott Joplin - The Entertainer.pdf']
        ]
    },
    methods: {
        selected(typeSelected){          
            switch(typeSelected) {
                case 'warmUp':
                    // We activate the warmUp button and desactivate the study button
                    document.getElementById('warm-up-button').classList.add('selected');
                    document.getElementById('study-button').classList.remove('selected');
                    break;
                case 'study':
                    // We activate the study button and desactivate the warmUp button
                    document.getElementById('warm-up-button').classList.remove('selected');
                    document.getElementById('study-button').classList.add('selected');
                    break;
                default:
                    // We desactivate the study and the warmUp buttons
                    document.getElementById('warm-up-button').classList.remove('selected');
                    document.getElementById('study-button').classList.remove('selected');
                    break;
            }

            filterList = this.pdfList.filter(pdf => {
                const type = pdf[3].toLowerCase();
                return type == typeSelected.toLowerCase() || typeSelected == '' || type == '';
            });
            this.load_sheets(filterList);

        },
        search() {
            // We get the value of the search input and convert it to lowercase
            const searchInput = document.getElementById('search-bar').value.toLowerCase();
            const filterList = this.pdfList.filter(pdf => {
                    const title = pdf[0].toLowerCase();
                    const author = pdf[1].toLowerCase();
                    const instrument = pdf[2].toLowerCase();
                    const type = pdf[3].toLowerCase();
            
                    // Verify if the search input is in the title, author or instrument
                    return title.includes(searchInput) || author.includes(searchInput) 
                    || instrument.includes(searchInput) || type.includes(searchInput);
                });

                console.log(filterList);
            
                // We reload the pdfs
                this.load_sheets(filterList);
            },
        // We convert the firts page of the pdf to an image and we load it in the div
        renderFirstPage(pdfUrl) {
            return pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
                return pdf.getPage(1).then(page => {
                    const scale = 0.6;
                    const viewport = page.getViewport({ scale });
        
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
        
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
        
                    return page.render(renderContext).promise.then(() => canvas);
                });
            });
        },
        load_sheets(pdfList) {
            const sheetsListDiv = document.getElementById('sheets');
            sheetsListDiv.innerHTML = '';
        
            pdfList.forEach(pdf => {
                const pdfContainer = document.createElement('div');
                pdfContainer.classList.add('pdf-container');

                // Change cursor to pointer for better UX
                pdfContainer.style.cursor = 'pointer';

                // Add an onclick event to the container
                pdfContainer.onclick = () => {
                    window.open(pdf[4], '_self'); // Open the pdf
                };
        
                const title = document.createElement('p');
                title.textContent = pdf[0];
                const author = document.createElement('p');
                author.textContent = pdf[1];
        
                // We add the title first
                pdfContainer.appendChild(title);
        
                // Render the first page of the PDF
                this.renderFirstPage(pdf[4]).then(canvas => {
                    pdfContainer.appendChild(canvas);
                    // We add the author after the image
                    pdfContainer.appendChild(author);
                });
        
                sheetsListDiv.appendChild(pdfContainer);
            });
        }
        
    },
    
    mounted() {
        // We load the sheets when the component is mounted
        this.load_sheets(this.pdfList);
    }
});