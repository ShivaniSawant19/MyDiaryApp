import Note from "../model/noteModel.js";
import BaseImplementation from "../implementation/baseImplementation.js";

let note = new Note();
let implementation = new BaseImplementation();
let root = document.getElementById('notes');

window.onload = () => {
    implementation.displayNotes(root);
    setColor('primary');
}

document.getElementById('add-edit').addEventListener('click',function() {
    note.title = document.getElementById('note-title').value;
    note.description = document.getElementById('note-description').value;
    if(note.description == '' && note.title == '') {
        alert('Note is empty!!');
    } else {
        if(note.id == 0) {
            implementation.Add(note);
            implementation.displayNotes(root);
        } else {
            implementation.Update(note.id,note);
            implementation.displayNotes(root);
        }
    }
})

function deleteNote(id) {
    alert(id)
    implementation.Delete(id);
    implementation.displayNotes(root);
}
window.deleteNote = deleteNote;

function editNote(id) {
    let index = implementation.collection.findIndex((ele) => ele.id == id);
    note.id = id;
    document.getElementById('note-title').value = implementation.collection[index].title;
    document.getElementById('note-description').value = implementation.collection[index].description;
    setColor(implementation.collection[index].color);
}
window.editNote = editNote;

function setColor(color) {
    note.color = color;
    document.querySelectorAll('span').forEach((item) => item.classList.remove('active'));
    // if(note.id != 0) event.target.classList.add('active');
    // else document.querySelectorAll('span')[0].classList.add('active');
    document.querySelector(`.${color}`).classList.add('active');
    document.getElementById('editor').removeAttribute('class');
    document.getElementById('editor').classList.add(color);
}
window.setColor = setColor;