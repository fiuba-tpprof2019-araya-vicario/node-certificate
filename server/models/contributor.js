
/**
 * @typedef Contributor
 * @property {[string]} id.required
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 * @property {[string]} padron.required 
 * @property {Array.<string>} careers.required 
 */
class Contributor {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.padron = data.padron;
        this.careers = data.careers;
    }
}

module.exports = Contributor;