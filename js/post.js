const server = 'http://localhost:3000'

const content = document.getElementById('content')
const commentContent = document.getElementById('commentContent')
const authorSelect = document.getElementById('authorSelect')
const addComment = document.getElementById('addComment')
const url = location.search;
const params = new URLSearchParams(url)
const idPost = params.get('idPost')

fetch(`${server}/posts/${idPost}`)
.then(response => response.json())
.then(post => {
    const title = document.createElement('h1')
    const contentP = document.createElement('p')
    
    contentP.textContent= post.content
    title.textContent= post.title
    content.appendChild(title)
    content.appendChild(contentP)
    return fetch(`${server}/users/${post.author}`)
})
.then(response => response.json())
.then(author => {
    const authorP = document.createElement('p')
    authorP.textContent = `${author.last_name}, ${author.first_name}`
    content.appendChild(authorP)

})
.catch(error => console.log('Error: ', error))

fetch(`${server}/comments?post=${idPost}`)
.then(response => response.json())
.then(comments => {
    for (const comment of comments) {
        fetch(`${server}/users/${comment.author}`)
        .then(response => response.json())
        .then(author => {
            // const divCom = document.createElement('div')
            const postCard = document.createElement('aside')
            const heading = document.createElement('h3')
            const commentContent = document.createElement('p')
            heading.textContent = `${author.last_name}, ${author.first_name}`
            commentContent.textContent = comment.content
            postCard.appendChild(heading)
            postCard.appendChild(commentContent)
            content.appendChild(postCard)

        })
        .catch(error => console.log(error))
    }
})
.catch(error => console.log(error))

fetch(`${server}/users`)
.then( response => {
    if (response.ok){
        return response.json()
    }
    return Promise.reject(response)
})
.then(authors => {
    for (const author of authors) {
        const option = document.createElement('option')
        option.textContent=`${author.last_name}, ${author.first_name}`
        option.value=author.id
        authorSelect.appendChild(option)
    }
})

addComment.addEventListener('click', (event)=>{
    event.preventDefault()
    const content = commentContent.value
    const author = authorSelect.value
    const newComment = { content, author, 'post': idPost}
    fetch(`${server}/comments`,{
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {'Content-type': 'application/json' }

    })
    .then(response => {
        if(response.ok){
            return response.json()
        }
        return Promise.reject(response)
    })
    .then(comment => {
        console.log(comment)
        alert('El comentario se ha creado correctamente')
        location.reload()
    })
})

// {id: 857, first_name: 'Reece', last_name: 'Darben', email: 'rdarbenns@dagondesign.com', gender: 'Male'}