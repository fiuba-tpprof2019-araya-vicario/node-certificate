pragma solidity >=0.4.25 <0.7.0;
pragma experimental ABIEncoderV2;

contract Certificate {

	uint256 public version = 1;

	struct Project {
		string id;
		string name;
		string proposal_url;
		string proposal_drive_id;
		string proposal_name;
		string creatorId;
		string tutorId;
		bool exists;
		bool locked;
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

	address public auditor;

	mapping(string => Project) projects_set;
	mapping(string => Contributor) contributors_set;
	mapping(string => Tutor) tutors_set;

	mapping(string => Type) project_type_set;
	mapping(string => Contributor) project_owner_set;
	mapping(string => Tutor) project_tutor_set;
	mapping(string => string[]) project_contributors_set;
	mapping(string => string[]) project_cotutors_set;

	constructor() public {
		auditor = msg.sender;
	}

	function createContributor(Contributor memory _data) public {
		//check that doesn't exists
		assert(_data.exists == false);
		assert(contributors_set[_data.id].exists == false);
		contributors_set[_data.id] = _data;
		contributors_set[_data.id].exists = true;
	}

	function getContributor(string memory _id) public view returns(Contributor memory contributor){
		//check that contributor exists
		contributor = contributors_set[_id];
		assert(contributor.exists);
	}

	function createTutor(Tutor memory _data) public {
		//check that doesn't exists
		assert(_data.exists == false);
		assert(tutors_set[_data.id].exists == false);
		tutors_set[_data.id] = _data;
		tutors_set[_data.id].exists = true;
	}

	function getTutor(string memory _id) public view returns(Tutor memory tutor){
		//check that tutor exists
		tutor = tutors_set[_id];
		assert(tutor.exists);
	}

	function createProject(string memory _type_name, Project memory _data) public {
		//check that doesn't exists
		assert(projects_set[_data.id].exists == false);
		//check that owner exists
		assert(contributors_set[_data.creatorId].exists == true);
		//check that tutor exists
		assert(tutors_set[_data.tutorId].exists == true);

		projects_set[_data.id] = _data;
		project_type_set[_data.id] = Type(_type_name);
		projects_set[_data.id].exists = true;
	}

	function addProjectContributor(string memory _project_id, string memory _contributor_id) public {
		//check that project exists
		assert(projects_set[_project_id].exists);
		//check that contributor exists
		assert(contributors_set[_contributor_id].exists);

		project_contributors_set[_project_id].push(_contributor_id);
	}

	function addProjectTutor(string memory _project_id, string memory _tutor_id) public {
		//check that project exists
		assert(projects_set[_project_id].exists);
		//check that contributor exists
		assert(tutors_set[_tutor_id].exists);

		project_cotutors_set[_project_id].push(_tutor_id);
	}

	function getProject(string memory _id) public view returns(Project memory project,
															   Type memory oftype,
														       Contributor memory creator,
															   Tutor memory tutor,
															   string[] memory contributors,
															   string[] memory cotutors){
		//check that project exists
		project = projects_set[_id];
		assert(project.exists);
		oftype = project_type_set[_id];
		creator = contributors_set[project.creatorId];
		tutor = tutors_set[project.tutorId];
		contributors = project_contributors_set[_id];
		cotutors = project_cotutors_set[_id];
	}
}
