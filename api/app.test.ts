// api.test.ts
import request from 'supertest';
import  createApp from './app'; // Adjust this path according to your project

let app: any;

beforeAll(async () => {
  // Initialize the app without starting the server
  app = await createApp();
});

describe('GET /office', () => {
    it('should return all offices when no query params are provided', async () => {
        jest.setTimeout(50000)
        const response = await request(app).get('/office');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Office data fetch successfully.");
    });

    it('should filter offices by status', async () => {
        const response = await request(app).get('/office?status=active');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Office data fetch successfully.");
    });

    it('should return an empty array if no offices match the status', async () => {
        jest.setTimeout(20000);
        const response = await request(app).get('/office?status=closed');
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('Office status is not proper. It should be actve/inactive');
    });
});

describe('GET /member', () => {
    it('should return all members when no query params are provided', async () => {
        const response = await request(app).get('/member');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('Member data fetch successfully.');
    });

    it('should return a member by id', async () => {
        const response = await request(app).get('/member?id=1');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('Member data fetch successfully.');
    });

    it('should return a member by office_id', async () => {
        const response = await request(app).get('/member?office_id=3');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('Member data fetch successfully.');
    });
});

describe('GET /transaction', () => {
    it('should return all members when no query params are provided', async () => {
        const response = await request(app).get('/transaction');
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('member_id or transaction_id is require to get transaction data.');
    });

    it('should return a transaction by member_id', async () => {
        const response = await request(app).get('/transaction?member_id=2');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('Transaction data fetch successfully.');
    });

    it('should return a transaction by transaction_id', async () => {
        const response = await request(app).get('/transaction?transaction_id=3');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual('Transaction data fetch successfully.');
    });
});
