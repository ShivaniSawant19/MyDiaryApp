export default class Note {
    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.color = '#444';
        this.date = new Date().toLocaleDateString();
    }
}