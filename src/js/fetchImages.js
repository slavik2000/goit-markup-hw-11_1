const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42192566-3aa66b6addb563a411dc58658';
const PER_PAGE = 40;
// const TOTAL_SERVICE = 500;      

async function fetchImages(inputValue, pageNumber) {
    const resp = await fetch(
        `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${pageNumber}`
    );

    if (!resp.ok) {
        if (resp.status === 404) {
            return [];
        }
        throw new Error(resp.status);
        };

    const data = await resp.json();
    return data;
};


// отклонено
// async function fetchImages(inputValue, pageNumber) {
//     return await fetch(
//         `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${pageNumber}`
//     )
//         .then(async resp => {
//             if (!resp.ok) {
//                 if (resp.status === 404) {
//                     return [];
//                 }
//                 throw new Error(resp.status);
//             }
//             // console.log(resp);      
//             return await resp.json();
//         })
//         .catch(error => {
//             console.error(error);
//         });
// };


export {fetchImages, PER_PAGE};