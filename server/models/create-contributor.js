const uuid = require('uuid');

 /**
 * @typedef CreateContributor
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 * @property {[string]} padron.required 
 * @property {Array.<string>} careers.required 
 */

 class CreateContributor {
     constructor(data){
         this.id = data.id || uuid.v4();
         this.name = data.name;
         this.surname = data.surname;
         this.email = data.email;
         this.padron = data.padron || "1234";
         this.careers = data.careers || ["Sin Carrera"]; //data.careers || ["Sin Carrera"];
     }
 }

 module.exports = CreateContributor;