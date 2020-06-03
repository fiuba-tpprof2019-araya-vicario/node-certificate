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
 * @property {[string]} typeId.required
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {Type.model} oftype.required 
 * @property {Contributor.model} creator.required 
 * @property {Array.<string>} studentIds.required 
 * @property {Tutor.model} tutor.required 
 * @property {Array.<string>} cotutorIds.required 
 */
class Project {
    constructor(data){
        this.id = data.properties.id;
        this.typeId = data.properties.typeId;
        this.name = data.properties.name; 
        this.proposal_url = data.properties.proposal_url;
        this.proposal_drive_id = data.properties.proposal_drive_id;
        this.proposal_name = data.properties.proposal_name;
        this.studentIds = data.properties.studentIds;
        this.cotutorIds = data.properties.cotutorIds;
        this.oftype = new Type(data.oftype);
        this.creator = new Contributor(data.creator);
        this.tutor = new Tutor(data.tutor);
    }
}

module.exports = Project;