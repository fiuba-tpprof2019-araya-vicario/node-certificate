const uuid = require('uuid');

/**
 * @typedef ProjectProperties
 * @property {[string]} typeId.required
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 */

/**
 * @typedef CreateProject
 * @property {[string]} typeId.required
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {[string]} creatorId.required
 * @property {[string]} tutorId.required
 * @property {Array.<string>} studentIds.required 
 * @property {Array.<string>} cotutorIds.required 
 */
class CreateProject {
    constructor(data, creatorId, tutorId){
        this.id = data.id || uuid.v4();
        this.typeId = data.typeId;
        this.name = data.name;
        this.proposal_url = data.proposal_url;
        this.proposal_drive_id = data.proposal_drive_id;
        this.proposal_name = data.proposal_name;
        this.creatorId = data.creatorId || creatorId;
        this.tutorId = data.tutorId || tutorId;
        this.studentIds = data.studentIds || [];
        this.cotutorIds = data.cotutorIds || [];
    }
}

module.exports = CreateProject;