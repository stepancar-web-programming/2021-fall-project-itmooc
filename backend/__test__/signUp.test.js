const request = require('supertest');
const moment = require('moment');

const app = require('../app');
const User = require('../src/models/user');

beforeAll(async () => {
    try {
        await User.deleteOne({ login: 'test_account.123' });
    } catch (error) {}
});

test('Create account: successful created account', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(201);
});

test('Conflict: login already existed', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(409);
});

test('Invalid format login: invalid character', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '__test__$account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '__test__@account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account,123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid format login: start with dash or dot', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '_test_account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '.test_account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid format login: end with dash or dot', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123_',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123.',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid format login: double dash or double dot', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test__account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '__test__..account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid format login: too short', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '1234567',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'abcdefg',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid format login: too long', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: '123456789012345678901',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid birthday: after today', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: '2100-11-15',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: moment().add(1, 'days').format('YYYY-MM-DD'),
            gender: 'male'
        })
        .expect(400);
});

test('Invalid birthday: invalid date', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: '2000-13-01',
            gender: 'male'
        })
        .expect(400);

    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: '2000-11-31',
            gender: 'male'
        })
        .expect(400);
});

test('Invalid gender', async () => {
    await request(app)
        .post('/api/v1/sign-up')
        .send({
            login: 'test_account.1234',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'abcxyz'
        })
        .expect(400);
});
