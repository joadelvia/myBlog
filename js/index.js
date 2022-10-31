const section = document.querySelector('#list')


// function getAuthorname(id,authorEl) {
//     const reqAuthor=new XMLHttpRequest();
//     reqAuthor.open('GET', `http://localhost:3000/users/${id}`);
//     reqAuthor.send();
//     reqAuthor.addEventListener('load', function() {
//     if (reqAuthor.status===200) {
//         let author=JSON.parse(reqAuthor.responseText);
//         authorEl.textcontent = `${author.first_name} ${author.last_name}`
//     }
//     })
// }
const peticion=new XMLHttpRequest();
peticion.open('GET', 'http://localhost:3000/posts');
peticion.send();
peticion.addEventListener('load', function() {
    if (peticion.status===200) {
        let posts=JSON.parse(peticion.responseText);  // Convertirmos los datos JSON a un objeto
        // procesamos los datos que tenemos en posts
        for (const post of posts) {
            let postCard = document.createElement('aside')
            let heading = document.createElement('h3')
            let link = document.createElement('a')
            link.textContent='Ver más'
            
            let author = []
            author = document.createElement('p')

            // author.textContent =`Author: ${getAuthorname(post.id, author)}`
            // getAuthorname(post.id, author)
            let reqAuthor = []
            reqAuthor=new XMLHttpRequest();
            reqAuthor.open('GET', `http://localhost:3000/users/${post.author}`);
            reqAuthor.send();
            reqAuthor.addEventListener('load', function() {
            if (reqAuthor.status===200) {
                let resAuthor=JSON.parse(reqAuthor.responseText);
                author.textContent = `${resAuthor.first_name} ${resAuthor.last_name}`
                
            }
            })
            heading.textContent = post.title
            link.href= `post.html?idPost=${post.id}`
            postCard.appendChild(heading)
            postCard.appendChild(link)
            postCard.appendChild(author)
            section.appendChild(postCard)
            
            
        }
    } else {
        muestraError();
    }
})
peticion.addEventListener('error', muestraError);
peticion.addEventListener('abort', muestraError);
peticion.addEventListener('timeout', muestraError);

function muestraError() {
    if (this.status) {
        console.log("Error "+this.status+" ("+this.statusText+") en la petición");
    } else {
        console.log("Ocurrió un error o se abortó la conexión");
    }
}
