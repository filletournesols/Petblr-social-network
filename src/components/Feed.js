import { signOutFun } from '../app/signOut.js';
import { onNavigate } from '../main.js';
import { firebaseAuth, getOnDatas, getPost, updatePosts, erasePost, serverTimestamp } from '../app/firebase.js';
import { saveTask } from '../app/addDoc.js';
import { likePost, dislikePost } from '../app/likePosts.js';

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
            const amountLikes = ""
            const arrayUsersLikes = ""
            saveTask(posts.value, loggedInUserId, userName, date, createdAt, amountLikes, arrayUsersLikes)
        } else {
            updatePosts(id, { description: posts.value })
            stateEdit = false
            id = ''
        }
        taskForm.reset();
    })

    getOnDatas((listasPosts) => {
        const loggedInUserId = window.localStorage.getItem('loggedInUserId')
        postsContainer.innerHTML = ''
        listasPosts.forEach((firebasePost) => {
            const postData = firebasePost.data();
            const userBtns = `
            <button class="edit-posts-div-btns">
                <img src="../Assets/edit-img.png" alt="edit-icon" class="edit-img" id="editPostsDivBtns" data-id="${firebasePost.id}">
            </button>
            <button class="delete-posts-div-btns">
                <img src="../Assets/delete-trash.png" alt="delete-trash" class="delete-img" id="deletePostsDivBtns" data-id="${firebasePost.id}">
            </button>`
            postsContainer.innerHTML += `
            <section class="posts" id="posts">
                <div>
                    <label class="author-name" for="user">${postData.authorName}</label>
                    <label class="date" for="date">${postData.date}</label>
                </div>
                <div class="posts-publication">
                    <h3>${postData.description}</h3>
                </div>
            </section>
            <section class="btn-posts">    
                <div class="posts-div-btns">            
                    <button data-uid="${firebasePost.id}" class="paw-posts-div-btns">
                        Like
                    </button>
                    <span class = "number-of-likes">${postData.arrayUsersLikes.length}</span>
                    ${loggedInUserId === postData.authorId ? userBtns : ''}
                </div>
            </section>
            `
        })

        //<img src="../Assets/patita-like.png" alt="white_paw" class="paw-img">

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
                const result = confirm("¿Estás seguro de eliminar la publicación?")
                if (result === false) {} 
                else {erasePost(dataset.id)}
            })
        });

        const likeButton = FeedDiv.querySelectorAll('.paw-posts-div-btns');
        const numberOfLikes = FeedDiv.querySelectorAll('.number-of-likes');

        numberOfLikes.forEach((btn) => {
            if (btn.innerHTML === '0') {
                btn.classList.add('hide');
            } else {
                btn.classList.remove('hide');
            }
        })

        likeButton.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const currentUserLike = firebaseAuth.currentUser.uid;
                const idLikeButton = e.target.dataset.uid;
                getPost(idLikeButton)
                    .then((document) => {
                        const post = document.data();
                        if (!post.arrayUsersLikes.includes(currentUserLike)) {
                            const likes = (post.amountLikes) + 1;
                            likePost(idLikeButton, likes, currentUserLike);
                        } else {
                            const likes = (post.amountLikes) - 1;
                            dislikePost(idLikeButton, likes, currentUserLike);
                        }
                    })
                    .catch(() => {
                    });
            });
        });
    })

    return FeedDiv;
}