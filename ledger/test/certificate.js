const Certificate = artifacts.require("Certificate");

contract('Certificate', (accounts) => {
  
  const projectId = 'project-1';
  const creatorId = 'contrib-1';
  const tutorId = 'tutor-1';

  it('should save contributor', async () => {
    const certificateInstance = await Certificate.deployed();
    
    const owner = { id: creatorId, name: 'john', surname: 'doe', email: 'johndoe@yopmail.com', padron: '423423423', careers:['arqueologia'] };

    await certificateInstance.createContributor(owner);

    const result = await certificateInstance.getContributor(creatorId);

    const saved = result.valueOf();

    assert.equal(saved.name, owner.name, "name doesn't match");
  });

  it('should save tutor', async () => {
    const certificateInstance = await Certificate.deployed();

    const tutor = { id: tutorId, name: 'john', surname: 'smith', email: 'johnsmith@yopmail.com' };
     
    await certificateInstance.createTutor(tutor);

    const result = await certificateInstance.getTutor(tutorId);

    const saved = result.valueOf();

    assert.equal(saved.name, tutor.name, "name doesn't match");
  });

  it('should save project', async () => {
    const certificateInstance = await Certificate.deployed();
    const type_name = 'sample-type';
     
    const data = { id: projectId, typeId: type_name, creatorId: creatorId , tutorId: tutorId, studentIds: [], cotutorIds: [] , name: 'nombre', proposal_url:'http://p.txt', proposal_drive_id: 'drive id', proposal_name: 'proposal name'};

    await certificateInstance.createProject(data);

    const result = await certificateInstance.getProject(projectId);

    const saved = result.valueOf();

    assert.equal(saved.oftype.name, type_name, "type doesn't match");

    assert.equal(saved.properties.typeId, data.typeId, "typeId doesn't match");
    assert.equal(saved.properties.creatorId, data.creatorId, "creatorId doesn't match");
    assert.equal(saved.properties.tutorId, data.tutorId, "creatorId doesn't match");
    assert.equal(saved.properties.name, data.name, "name doesn't match");
    assert.equal(saved.properties.proposal_url, data.proposal_url, "proposal_url doesn't match");
    assert.equal(saved.properties.proposal_drive_id, data.proposal_drive_id, "proposal_drive_id doesn't match");
    assert.equal(saved.properties.proposal_name, data.proposal_name, "proposal_name doesn't match");
    
  });

  it('should add student', async () => {
    const certificateInstance = await Certificate.deployed();
    const contributorId = 'contrib-2';
    await certificateInstance.createContributor({ id: contributorId, name: 'gordon', surname: 'shumway', email: 'alf@yopmail.com', padron: '53564564', careers:['ufologia'] });
    await certificateInstance.addProjectStudent(projectId, contributorId);
    
    const result = await certificateInstance.getProject(projectId);
    const saved = result.valueOf();

    assert.equal(saved.properties.studentIds[0], contributorId, "contributorId doesn't match");
  });

  it('should add cotutor', async () => {
    const certificateInstance = await Certificate.deployed();
    const tutorId = 'tutor-2';
    await certificateInstance.createTutor({ id: tutorId, name: 'willie', surname: 'tanner', email: 'willie@yopmail.com' });
    await certificateInstance.addProjectTutor(projectId, tutorId);
    
    const result = await certificateInstance.getProject(projectId);
    const saved = result.valueOf();

    assert.equal(saved.properties.cotutorIds[0], tutorId, "tutorId doesn't match");
  });

});
