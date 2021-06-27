const chai = require('chai');
const sinon = require('sinon');
const activityController = require('../activity');
const repository = require('../../repository/activity');
const validator = require('express-validator');


describe('Get activity Detail', async () => {
    const succesGetDetail = {
        params: {
            id: 1
        }
    }
    const idNotExists = {
        params: {
            id: 234536563
        }
    }
    const errorGetdetail = {
        
    }
    const successReturn = {
        id: 1,
        name: 'Apoyo Escolar para el nivel Primario',
        image: 'http://www.centroformacionelite.com/wp-content/uploads/2019/01/cinco-beneficios-apoyo-escolar.jpg',
        content: 'El espacio de apoyo escolar es el corazón del área educativa. Se realizan los talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el contraturno, Los sábados también se realiza el taller para niños y niñas que asisten a la escuela doble turno. Tenemos un espacio especial para los de 1er grado 2 veces por semana ya que ellos necesitan atención especial! Actualmente se encuentran inscriptos a este programa 150 niños y niñas de 6 a 15 años. Este taller está pensado para ayudar a los alumnos con el material que traen de la escuela, también tenemos una docente que les da clases de lengua y matemática con una planificación propia que armamos en Manos para nivelar a los niños y que vayan con más herramientas a la escuela.',
        deletedAt: null,
        createdAt: '2021-06-15T18:27:25.000Z',
        updatedAt: '2021-06-15T18:27:25.000Z'
    }

    const mockResponse = () => {
        const res = {};
        res.statusCode = 200;
        res.status = (status) => {
            res.statusCode = status;
            return res
        }
        res.jsonReturned = {};
        res.json = (json) => {
            res.jsonReturned = json;
            return res
        }
        return res;
    };

    before(() => {
        mockedRepo = sinon.mock(repository);
    });
    beforeEach(() => {
        const mocked_getActivity = sinon.stub(repository, 'getActivityById')
        mocked_getActivity.withArgs(succesGetDetail.params.id).returns(Promise.resolve(successReturn))
        mocked_getActivity.withArgs(idNotExists.params.id).returns(Promise.resolve())
        mocked_getActivity.withArgs(errorGetdetail).throws("TypeError: Cannot read property 'id' of undefined")
    });
    afterEach(() => {
        sinon.restore()
    });
    after(() => {});

    it('Should returns 404 if id not exists', async () => {
        //Arrange
        const res = mockResponse();
        const req = idNotExists;
        //Act
        const result = await activityController.detailController(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 404)
        chai.assert.equal(result.jsonReturned.error, 'Not found')
    })

    it('Should returns 200 and activity detail', async () => {
        //Arrange
        const res = mockResponse();
        const req = succesGetDetail;
        //Act
        const result = await activityController.detailController(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 200)
        chai.assert.equal(result.jsonReturned, successReturn)
    });

    it('Should returns error with status 500', async () => {
        //Arrange
        const res = mockResponse();
        const req = errorGetdetail;
        //Act
        const result = await activityController.detailController(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 500)
        chai.assert.equal(result.jsonReturned.error, "TypeError: Cannot read property 'id' of undefined")
    });
});

describe('Create new activity', async () => {


    const succesCreateActivity = {
        body:{
            name:"Actividad",
            image:null,
            content:"Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity",
        }        
    }
    const successReturn = {
        id: 32,
        name:"Actividad",
        image:null,
        content:"Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity",
        createdAt: '2021-06-15T18:27:25.000Z',
        updatedAt: '2021-06-15T18:27:25.000Z'
    }

    const errorCreateActivity = {
        body:{
            name:"asdasdlkasdmasldfjcasnjuvflseugnvlsdfgbdkblvdfklbkdtf undefined",
            image:"f56sd4f3sdf3dsd.png",
            content:"Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity",
        },
        file: "bad_file"
    }
    
    const mockResponse = () => {
        const res = {};
        res.statusCode = 200;
        res.status = (status) => {
            res.statusCode = status;
            return res
        }
        res.jsonReturned = {};
        res.json = (json) => {
            res.jsonReturned = json;
            return res
        }
        return res;
    };

    before(() => {
    });
    beforeEach(() => {
        const mocked_createNewActivity = sinon.stub(repository, 'createNewActivity')
        const mocked_validator = sinon.stub(validator, 'validationResult')
        mocked_validator.returns()
        mocked_createNewActivity.withArgs(succesCreateActivity.body).returns(Promise.resolve(successReturn))
        mocked_createNewActivity.withArgs(errorCreateActivity).throws("Error: params.Body is required")
    });
    afterEach(() => {
        sinon.restore()
    });
    after(() => {});

    it('Should returns 201 and created activity json ', async () => {
        //Arrange
        const res = mockResponse();
        const req = succesCreateActivity;
        //Act
        const result = await activityController.createNewActivityController(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 201)
        chai.assert.equal(result.jsonReturned,successReturn)
    })

    it('Should returns error with bad file and 500 status', async () => {
        //Arrange
        const res = mockResponse();
        const req = errorCreateActivity;
        //Act
        const result = await activityController.createNewActivityController(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 500)
        chai.assert.equal(result.jsonReturned.error, "Error: params.Body is required")
    });

});

describe('Edit activity', async () => {
    const activityToEdit = 
        {
                id: 1,
                name: 'name',
                image: null,
                content: 'Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity',
                deletedAt: null,
                createdAt: '2021-06-15T18:27:25.000Z',
                updatedAt: '2021-06-26T12:23:07.000Z'
        }
        const deletedActivityToEdit = 
        {
                id: 10,
                name: 'name',
                image: null,
                content: 'Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity',
                deletedAt: '2021-06-15T18:27:25.000Z',
                createdAt: '2021-06-15T18:27:25.000Z',
                updatedAt: '2021-06-26T12:23:07.000Z'
        }
        const deletedActivityRequest = {
            body:{
                name:"Modified_name",
                image:null,
                content:"mofified_content_Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity",
            },
            params:{
                id: 10
            }        
        }          
    const successRequest = {
        body:{
            name:"Modified_name",
            image:null,
            content:"mofified_content_Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity",
        },
        params:{
            id: 1
        }        
    }
    const successEditedActivity = {
            id: 1,
            name: 'Modified_name',
            image: null,
            content: 'mofified_content_Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity',
            deletedAt: null,
            createdAt: '2021-06-15T18:27:25.000Z',
            updatedAt: '2021-06-26T12:23:07.000Z'
    }
    const error_ActivityNotFound = {
        params:{
            id: 15461361631
        }     
    }
    const error_Not_Id = {
            name: 'name',
            image: null,
            content: 'Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity',
            deletedAt: null,
            createdAt: '2021-06-15T18:27:25.000Z',
            updatedAt: '2021-06-26T12:23:07.000Z',
            id:undefined
    }
    const error_Not_IdRequest = {
        body:{
            name:"Modified_name",
            image:null,
            content:"mofified_content_Lorem ipsum activity Lorem ipsum activity Lorem ipsum activity",
        },
        params:{
            id: 5
        }        
    }
    
    const mockResponse = () => {
        const res = {};
        res.statusCode = 200;
        res.status = (status) => {
            res.statusCode = status;
            return res
        }
        res.jsonReturned = {};
        res.json = (json) => {
            res.jsonReturned = json;
            return res
        }
        return res;
    };

    before(() => {
    });
    beforeEach(() => {
        const mocked_getActivityById = sinon.stub(repository, 'getActivityById')
        mocked_getActivityById.withArgs(successRequest.params.id).returns(Promise.resolve(activityToEdit))
        mocked_getActivityById.withArgs(error_ActivityNotFound.params).returns(Promise.resolve({}))
        mocked_getActivityById.withArgs(deletedActivityRequest.params.id).returns(Promise.resolve(deletedActivityToEdit))
        mocked_getActivityById.withArgs(error_Not_IdRequest.params.id).returns(Promise.resolve(error_Not_Id))
        
        const mocked_editActivity = sinon.stub(repository, 'updateActivity')
        mocked_editActivity.withArgs(successRequest.body,activityToEdit.id).returns(Promise.resolve(successEditedActivity))
        mocked_editActivity.withArgs(error_Not_IdRequest.body,error_Not_Id.id).throws('Error: WHERE parameter "id" has invalid "undefined" value')
    });
    afterEach(() => {
        sinon.restore()
    });
    after(() => {});

    it('Should returns 200 and edited activity json ', async () => {
        //Arrange
        const res = mockResponse();
        const req = successRequest;
        //Act
        const result = await activityController.editActivity(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 200)
        chai.assert.equal(result.jsonReturned,successEditedActivity)
    })

    it('Should returns 404 and activity not found ', async () => {
        //Arrange
        const res = mockResponse();
        const req = error_ActivityNotFound;
        //Act
        const result = await activityController.editActivity(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 404)
        chai.assert.equal(result.jsonReturned.error, 'Activity not found')
    })

    it('Should returns 409 deleted activity', async () => {
        //Arrange
        const res = mockResponse();
        const req = deletedActivityRequest;
        //Act
        const result = await activityController.editActivity(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 409)
        chai.assert.equal(result.jsonReturned.error, 'This activity is not available')
    })

    it('Should returns 500 where ID not returned from first query ', async () => {
        //Arrange
        const res = mockResponse();
        const req = error_Not_IdRequest;
        //Act
        const result = await activityController.editActivity(req, res)
        //Assert
        chai.assert.equal(result.statusCode, 500)
        chai.assert.equal(result.jsonReturned.error, 'Error: WHERE parameter "id" has invalid "undefined" value')
    })

});
