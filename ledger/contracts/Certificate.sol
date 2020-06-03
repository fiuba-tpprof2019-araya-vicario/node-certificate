pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

library Models{

	struct Properties {
		string id;
		string typeId;
		string name;
		string proposal_url;
		string proposal_drive_id;
		string proposal_name;
		string creatorId;
		string tutorId;
		string[] studentIds;
		string[] cotutorIds;
	}

	struct ProjectRef {
		Project project;
		bool exists;
	}

	struct Type {
		string name;
	}

	struct Contributor {
		string id;
		string name;
		string surname;
		string email;
		string padron;
		string[] careers;
		bool exists;
	}

	struct Tutor {
		string id;
		string name;
		string surname;
		string email;
		bool exists;
	}
}

contract Certificate {

	uint256 public version = 1;

	address public auditor;

	mapping(string => Models.ProjectRef) projects_set;
	mapping(string => Models.Contributor) contributors_set;
	mapping(string => Models.Tutor) tutors_set;

	constructor() public {
		auditor = msg.sender;
	}

	function createContributor(Models.Contributor memory _data) public {
		//check that doesn't exists
		assert(_data.exists == false);
		assert(contributors_set[_data.id].exists == false);
		contributors_set[_data.id] = _data;
		contributors_set[_data.id].exists = true;
	}

	function getContributor(string memory _id) public view returns(Models.Contributor memory contributor){
		//check that contributor exists
		contributor = contributors_set[_id];
		assert(contributor.exists);
	}

	function createTutor(Models.Tutor memory _data) public {
		//check that doesn't exists
		assert(_data.exists == false);
		assert(tutors_set[_data.id].exists == false);
		tutors_set[_data.id] = _data;
		tutors_set[_data.id].exists = true;
	}

	function getTutor(string memory _id) public view returns(Models.Tutor memory tutor){
		//check that tutor exists
		tutor = tutors_set[_id];
		assert(tutor.exists);
	}

	function createProject(Models.Properties memory _properties) public {
		//check that doesn't exists
		assert(projects_set[_properties.id].exists == false);
		//check that owner exists
		assert(contributors_set[_properties.creatorId].exists == true);
		//check that tutor exists
		assert(tutors_set[_properties.tutorId].exists == true);

		for (uint i = 0 ; i < _properties.studentIds.length; i++) {
			assert(contributors_set[_properties.studentIds[i]].exists == true);
		}

		for (uint i = 0 ; i < _properties.cotutorIds.length; i++) {
			assert(tutors_set[_properties.cotutorIds[i]].exists == true);
		}

		projects_set[_properties.id].project = new Project(_properties);
		projects_set[_properties.id].exists = true;
	}

	function addProjectStudent(string memory _project_id, string memory _contributor_id) public {
		//check that project exists
		assert(projects_set[_project_id].exists);
		//check that contributor exists
		assert(contributors_set[_contributor_id].exists);

		projects_set[_project_id].project.addStudent(_contributor_id);
	}

	function addProjectTutor(string memory _project_id, string memory _tutor_id) public {
		//check that project exists
		assert(projects_set[_project_id].exists);
		//check that contributor exists
		assert(tutors_set[_tutor_id].exists);

		projects_set[_project_id].project.addCoTutor(_tutor_id);
	}

	function getProject(string memory _id) public view returns(Models.Properties memory properties,
															   Models.Type memory oftype,
														       Models.Contributor memory creator,
															   Models.Tutor memory tutor){
		//check that project exists
		Models.ProjectRef memory ref = projects_set[_id];
		assert(ref.exists);
		properties = ref.project.getProperties();
		oftype = Models.Type(properties.typeId);
		creator = contributors_set[properties.creatorId];
		tutor = tutors_set[properties.tutorId];
	}
}

contract Project {
	address rootCertificate;
	Models.Properties properties;

	constructor(Models.Properties memory _properties) public {
		rootCertificate = msg.sender;
		properties = _properties;
	}

	function addStudent(string memory _id) public {
		properties.studentIds.push(_id);
	}

	function addCoTutor(string memory _id) public {
		properties.cotutorIds.push(_id);
	}

	function getProperties() public view returns(Models.Properties memory){
		return properties;
	}
}