import supertest from 'supertest';
import app from "../../src/app";
import {deleteData, disconnectPrisma} from './Factory/scenario'
import * as postsFunctions from './Factory/postFactory'
import {faker} from '@faker-js/faker';

beforeEach(async () => {
    await deleteData();
  });

describe("ROUTE AUTH", () => {
    it('REGISTER', async () => {
        const user = {
            email: faker.internet.email(),
            password: `Jhu${faker.random.numeric(10)}`
        }
        const result = await supertest(app).post('/register').send({email: user.email, password: user.password, confirmPassword: user.password})
        expect(result.status).toEqual(201);
});
})

afterAll(async () => {
    await disconnectPrisma();
  });