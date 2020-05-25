const uuid = require('uuid');

/**
 * @typedef ProjectProperties
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 */

/**
 * @typedef CreateProject
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {[string]} creatorId.required
 * @property {[string]} tutorId.required
 */
class CreateProject {
    constructor(data, creatorId, tutorId){
        this.id = data.id || uuid.v4();
        this.name = data.name;
        this.proposal_url = data.proposal_url;
        this.proposal_drive_id = data.proposal_drive_id;
        this.proposal_name = data.proposal_name;
        this.creatorId = data.creatorId || creatorId;
        this.tutorId = data.tutorId || tutorId;
    }
}

module.exports = CreateProject;