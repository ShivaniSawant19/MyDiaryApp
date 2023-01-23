export default class BaseImplementation {
    constructor() {
        let collection_temp = localStorage.getItem('notes');
        this.collection = collection_temp != null ? JSON.parse(collection_temp) : [];
    }

    Add(model) {
        let maxnum = this.arrayMax(this.collection);
        let newId = maxnum + 1;
        model['id'] = newId;
        this.collection.push(model);
        this.UpdateStore(this.collection);
    }

    Update(id, model) {
        let index = this.collection.findIndex((ele) => ele.id == id);
        this.collection[index] = model;
        this.UpdateStore(this.collection);
    }

    Delete(id) {
        let index = this.collection.findIndex((ele) => ele.id == id);
        this.collection.splice(index, 1);
        this.UpdateStore(this.collection);
    }

    arrayMax(arr) {
        if (arr.length == 0) {
            return 0;
        } else {
            let max_id = arr[0].id;
            arr.forEach(element => {
                if (element.id > max_id) max_id = element.id;
            });
            return max_id;
        }
    }

    UpdateStore(arr) {
        localStorage.setItem('notes', JSON.stringify(arr));
    }

    displayNotes(tableReference, arr = this.collection) {
        tableReference.innerHTML = '';
        let row = document.createElement('div');
        row.classList.add('row');

        /*
        let col = document.createElement('div');
            col.style.maxWidth = '20rem';
            col.classList.add('card','text-white','bg-secondary', 'mb-3');
            let title = element.title;
            let description = element.description;
        */
        if(this.collection.length > 0) {
            arr.forEach(element => {
                let card = document.createElement('div');
                let btns = `<div class="float-btn edit-delete row">
                                <button type="button" onclick=editNote(${element.id}) class="btn edit-btn"><i class="fa-solid fa-pen-to-square edit"></i></button>
                                <button type="button" onclick="deleteNote(${element.id})" class="btn delete-btn"><i class="fa-solid fa-trash delete"></i></button>
                            </div>`;
                card.classList.add('col-lg-3','col-md-6','col-sm-2');
                card.innerHTML = `<div class="card ${element.color} text-white mb-3" style="max-width: 20rem;">
                                <div class="card-header">
                                    <h4 class="heading">${element.title}</h4>
                                    <h5 hidden>${element.id}</h5>
                                </div>
                                ${btns}
                                <div class="card-body">
                                    <p>${element.description}</p>
                                </div>
                                <div class="footer">
                                    <p>${element.date}</p>
                                </div>
                            </div>`;
                row.appendChild(card);
            })
            console.log(this.collection.length);
        }
        tableReference.append(row);
    }
    
}

/*
<div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">
                <input id="note-title" class="form-control-plaintext title" type="text" placeholder="Title">
            </div>
            <div class="card-body">
                <textarea id="note-description" class="form-control-plaintext" rows="3" placeholder="Note"></textarea>
            </div>
        </div>


        'col','col-lg-4','col-md-6',
*/