/**
 * @typedef Tutor
 * @property {[string]} id.required
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 */

 class Tutor {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
    }
 }

 module.exports = Tutor;