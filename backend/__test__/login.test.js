const request = require('supertest');

const app = require('../app');
const User = require('../src/models/user');

beforeAll(async () => {
    try {
        await User.deleteOne({ login: 'test_account.123' });
    } catch (error) {}
});

test('Login: user is not existed', async () => {
    await request(app)
        .post('/api/v1/sign-in')
        .send({
            login: 'test_account.123',
            password: 'test_password'
        })
        .expect(400);
});

test('Login: incorrect password', async () => {
    try {
        await request(app).post('/api/v1/sign-up').send({
            login: 'test_account.123',
            password: 'test_password',
            birthday: '2000-11-15',
            gender: 'male'
        });
    } catch (error) {}

    await request(app)
        .post('/api/v1/sign-in')
        .send({
            login: 'test_account.123',
            password: 'test_password2'
        })
        .expect(400);
});

test('Login: successful', async () => {
    await request(app)
        .post('/api/v1/sign-in')
        .send({
            login: 'test_account.123',
            password: 'test_password'
        })
        .expect(200);
});
