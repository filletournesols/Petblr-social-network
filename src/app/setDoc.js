import { doc, setDoc, collection } from './firebase.js'

// const postCollectionRef = collection(db, 'posts')
// const createPost = async ()=>{
//     await setDoc(doc(db, 'posts', ), {
//         name: "Los Angeles",
//         state: "CA",
//         country: "USA"
//     });
// }

import { saveTask } from '/firebase.js';
// import { saveTask } from "/firebase/app";
// import { getStorage } from "firebase/storage";

// guardar datos, tomandolos del html dandole dinamismo con js
const taskForm = document.getElementById("task-form")
const taskContainer = document.getElementById('task-container')


window.addEventListener("DOMContentLoaded", async () => {
const querySnapshot = await getTask()

  onSnapshot(collection (db, 'task'),(querySnapshot) => {
  let html = '';
  
  querySnapshot.forEach((doc) => {
    const task = doc.data();
    html += `
    <div>
     <h3>${task.title}</h3>
     <p>${task.description}</p>
    </div>
  `;

});
taskContainer.innerHTML = html;
});
 
taskForm.addEventListener ('submit', (e) => {
    e.preventDefault()
    const title = taskForm["task-title"]
    const description = taskForm["task-description"]

    console.log(title, description)

    saveTask(title.value, description.value)
    taskForm.reset()
})

})
