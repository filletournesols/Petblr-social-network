import { signOutFun } from '../app/signOut.js';
import { onNavigate } from '../main.js';
import { firebaseAuth, getOnDatas, getPost, updatePosts, erasePost, serverTimestamp } from '../app/firebase.js';
import { saveTask } from '../app/addDoc.js';

export const Feed = () => {
    const FeedDiv = document.createElement('div');
    const template = `
    <section class="logo-feed" id="logoFeed">
        <nav class="nav-bar">
                <img src="../Assets/Petblr-blanco.png"  alt="logo" class="logo-feed-img" id="logoFeedImg">
            <ul class="nav-menu" id="navMenu">
                <li class="nav-item-li">
                    <a href="#" class="nav-link" id="navLinkFeed">Muro</a>
                </li>
                <li class="nav-item-li">
                    <a href="#" class="nav-link" id="navLinkProfile">Perfil</a>
                </li>
                <li class="nav-item-li">
                    <a href="#" class="nav-link" id="navLinkCloseSession">Cerrar sesión</a>
                </li>
            </ul>
            <div class="hamburger-div" id="hamburgerDiv">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </nav>
    </section>
    <section class="posts" id="posts">
        <form class="task-form" id="taskForm">
            <textarea class="posts-div-p" id="postsTextArea" rows="3" placeholder="¿Qué piensas?"></textarea>
            <button class="create-post-btn" id="createPostBtn">PUBLICAR</button>
        </form>
    </section>
    <div id="postsContainer">
    </div>
    `
    FeedDiv.innerHTML = template
    const hamburger = FeedDiv.querySelector('#hamburgerDiv')
    const navMenu = FeedDiv.querySelector('#navMenu')
    let stateEdit = false
    let id = ''

    hamburger.addEventListener('click', () => {
        // añade clases de css existan o no
        hamburger.classList.toggle('active')
        navMenu.classList.toggle('active')
    })
    FeedDiv.querySelector('#navLinkFeed').addEventListener('click', () => {
        hamburger.classList.remove('active')
        navMenu.classList.remove('active')
    })
    FeedDiv.querySelector('#navLinkProfile').addEventListener('click', () => {
        hamburger.classList.remove('active')
        navMenu.classList.remove('active')
    })
    FeedDiv.querySelector('#navLinkCloseSession').addEventListener('click', () => {
        hamburger.classList.remove('active')
        navMenu.classList.remove('active')
        signOutFun(firebaseAuth)
        onNavigate('/')
    })

    const taskForm = FeedDiv.querySelector('.task-form')
    const posts = FeedDiv.querySelector('.posts-div-p')
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!stateEdit) {
            const loggedInUserId = window.localStorage.getItem('loggedInUserId')
            const userName = firebaseAuth.currentUser.displayName
            const date = new Date().toLocaleDateString('es-es', {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})
            const createdAt = serverTimestamp()
            saveTask(posts.value, loggedInUserId, userName, date, createdAt)
        } else {
            updatePosts(id, { description: posts.value })
            stateEdit = false
            id = ''
        }
        taskForm.reset();
    })

    //Timestamp.fromDate(new Date())

    getOnDatas((listasPosts) => {
        const loggedInUserId = window.localStorage.getItem('loggedInUserId')
        postsContainer.innerHTML = ''
        listasPosts.forEach((firebasePost) => {
            const postData = firebasePost.data();
            const userBtns = `
            <button class="edit-posts-div-btns"><img src="../Assets/edit-img.png" alt="edit-icon" class="edit-img" id="editPostsDivBtns" data-id="${firebasePost.id}"></button>
            <button class="delete-posts-div-btns"><img src="../Assets/delete-trash.png" alt="delete-trash" class="delete-img" id="deletePostsDivBtns" data-id="${firebasePost.id}"></button>`
            postsContainer.innerHTML += `
            <section class="posts" id="posts">
                <div>
                    <label class="author-name" for="user" id="authorName">${postData.authorName}</label>
                    <label class="date" for="date" id="date">${postData.date}</label>
                </div>
                <div class="posts-publication">
                    <h3>${postData.description}</h3>
                </div>
            </section>
            <section class="btn-posts" id="btnPosts">    
                <div class="posts-div-btns" id="postsDivBtns">            
                    <button class="paw-posts-div-btns"><img src="../Assets/patita-like.png" alt="white_paw" class="paw-img" id="pawPostsDivBtns" ></button>
                    ${loggedInUserId === postData.authorId ? userBtns : ''}
                </div>
            </section>
            `            
        })

        const btnEditDiv = FeedDiv.querySelectorAll(".edit-posts-div-btns")
        const forTextArea = FeedDiv.querySelector("#postsTextArea")
        btnEditDiv.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                try {
                    const getId = await getPost(e.target.dataset.id)
                    const post = getId.data()
                    stateEdit = true
                    id = getId.id
                    forTextArea.value = post.description
                } catch (error) { 
                    return error
                }                
            });
        })

        const eraseBTn = FeedDiv.querySelectorAll(".delete-posts-div-btns");
        eraseBTn.forEach((btn) => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                erasePost(dataset.id)                
            })
        });
    })

    return FeedDiv;
}