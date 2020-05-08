const Certificate = artifacts.require("Certificate");

contract('Certificate', (accounts) => {
  
  const projectId = 'project-1';
  const ownerId = 'contrib-1';
  const tutorId = 'tutor-1';

  it('should save contributor', async () => {
    const certificateInstance = await Certificate.deployed();
    
    const owner = { name: 'john', surname: 'doe', email: 'johndoe@yopmail.com', padron: '423423423', careers:['arqueologia'] };

    await certificateInstance.createContributor(ownerId, owner);

    const result = await certificateInstance.getContributor(ownerId);

    const saved = result.valueOf();

    assert.equal(saved.name, owner.name, "name doesn't match");
  });

  it('should save tutor', async () => {
    const certificateInstance = await Certificate.deployed();

    const tutor = { name: 'john', surname: 'smith', email: 'johnsmith@yopmail.com' };
     
    await certificateInstance.createTutor(tutorId, tutor);

    const result = await certificateInstance.getTutor(tutorId);

    const saved = result.valueOf();

    assert.equal(saved.name, tutor.name, "name doesn't match");
  });

  it('should save project', async () => {
    const certificateInstance = await Certificate.deployed();
    const type_name = 'sample-type';
     
    const data = { ownerId: ownerId , tutorId: tutorId, name: 'nombre', proposal_url:'http://p.txt', proposal_drive_id: 'drive id', proposal_name: 'proposal name'};

    await certificateInstance.createProject(projectId, type_name, data);

    const result = await certificateInstance.getProject(projectId);

    const saved = result.valueOf();

    assert.equal(saved.oftype.name, type_name, "type doesn't match");

    assert.equal(saved.project.ownerId, data.ownerId, "ownerId doesn't match");
    assert.equal(saved.project.tutorId, data.tutorId, "ownerId doesn't match");
    assert.equal(saved.project.name, data.name, "name doesn't match");
    assert.equal(saved.project.proposal_url, data.proposal_url, "proposal_url doesn't match");
    assert.equal(saved.project.proposal_drive_id, data.proposal_drive_id, "proposal_drive_id doesn't match");
    assert.equal(saved.project.proposal_name, data.proposal_name, "proposal_name doesn't match");
    
  });

  it('should add contributor', async () => {
    const certificateInstance = await Certificate.deployed();
    const contributorId = 'contrib-2';
    await certificateInstance.createContributor(contributorId , { name: 'gordon', surname: 'shumway', email: 'alf@yopmail.com', padron: '53564564', careers:['ufologia'] });
    await certificateInstance.addProjectContributor(projectId, contributorId);
    
    const result = await certificateInstance.getProject(projectId);
    const saved = result.valueOf();

    assert.equal(saved.contributors[0], contributorId, "contributorId doesn't match");
  });

  it('should add cotutor', async () => {
    const certificateInstance = await Certificate.deployed();
    const tutorId = 'tutor-2';
    await certificateInstance.createTutor(tutorId , { name: 'willie', surname: 'tanner', email: 'willie@yopmail.com' });
    await certificateInstance.addProjectTutor(projectId, tutorId);
    
    const result = await certificateInstance.getProject(projectId);
    const saved = result.valueOf();

    assert.equal(saved.cotutors[0], tutorId, "tutorId doesn't match");
  });

});
