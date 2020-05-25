const uuid = require('uuid');

/**
 * @typedef CreateTutor
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 */

 class CreateTutor {
     constructor(data){
         this.id = data.id || uuid.v4();
         this.name = data.name;
         this.surname = data.surname;
         this.email = data.email;
     }
 }

 module.exports = CreateTutor;