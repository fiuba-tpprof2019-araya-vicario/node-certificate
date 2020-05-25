const Contributor = require('./contributor');
const Tutor = require('./tutor');


/**
 * @typedef Type
 * @property {[string]} name.required
 */
class Type{ 
    constructor(data){
        this.name = data.name;
    }
}

/**
 * @typedef Project
 * @property {[string]} id.required 
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {Type.model} oftype.required 
 * @property {Contributor.model} creator.required 
 * @property {Array.<Contributor>} contributors.required 
 * @property {Tutor.model} tutor.required 
 * @property {Array.<Tutor>} cotutors.required 
 */
class Project {
    constructor(data){
        this.id = data.project.id;
        this.name = data.project.name; 
        this.proposal_url = data.project.proposal_url;
        this.proposal_drive_id = data.project.proposal_drive_id;
        this.proposal_name = data.project.proposal_name;
        this.oftype = new Type(data.oftype);
        this.creator = new Contributor(data.creator);
        this.tutor = new Tutor(data.tutor);
        this.contributors = data.contributors.map(x=> new Contributor(x));
        this.cotutors = data.cotutors.map(x=> new Tutor(x));
    }
}

module.exports = Project;