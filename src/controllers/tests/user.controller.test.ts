
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsers } from '../user.controller';
import { SignUp, SignIn, getUserTours } from '../user.controller';
import User from '../../models/User.modle';
import Business from '../../models/Business.model';
import { AuthRequest } from '../../middlewares/users.middleware';

jest.mock('../../models/User.modle');
jest.mock('../../models/Business.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockRes = () =>
    ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }) as unknown as Response;

beforeEach(() => jest.clearAllMocks());

describe('getUsers', () => {
    it('should return users with status 200', async () => {
        const mockUsers = [{ name: 'Test User' }];
        (User.find as jest.Mock).mockResolvedValue(mockUsers);

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors', async () => {
        (User.find as jest.Mock).mockRejectedValue(new Error('DB error'));

        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await getUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
    });
});

describe('SignUp', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: {
                name: 'Test User',
                email: 'test@example.com',
                password: '123456',
                phone: '050-0000000'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if user already exists', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(true);

        await SignUp(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
    });

    it('should return 400 if manager not found', async () => {
        (User.findOne as jest.Mock)
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(null);

        await SignUp(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Manager not found' });
    });

    it('should create user and return token (regular user)', async () => {
        const fakeUser = {
            _id: '123',
            id: '123',
            name: 'Test User',
            email: 'test@example.com',
            phone: '050-0000000',
            isManager: false,
            save: jest.fn()
        };

        (User.findOne as jest.Mock)
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({ _id: 'manager123' });

        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpass');
        (User as any).mockImplementation(() => fakeUser);
        (jwt.sign as jest.Mock).mockReturnValue('token123');

        await SignUp(req as Request, res as Response);

        expect(fakeUser.save).toHaveBeenCalled();
        expect(Business.updateOne).toHaveBeenCalledWith({}, { $addToSet: { users: fakeUser._id } });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            token: 'token123',
            user: {
                id: fakeUser._id,
                name: fakeUser.name,
                email: fakeUser.email,
                phone: fakeUser.phone,
                isManager: fakeUser.isManager
            }
        });
    });
});

describe('SignIn', () => {
    let req: Partial<Request>;
    let res: Response;

    beforeEach(() => {
        req = {
            body: { email: 'test@example.com', password: '123456' }
        };
        res = mockRes();
    });

    it('should return 404 when user not found', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);

        await SignIn(req as Request, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'User does not exist' });
    });

    it('should return 401 on invalid password', async () => {
        (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed' });
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await SignIn(req as Request, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid details' });
    });

    it('should return 200 and token on success', async () => {
        const fakeUser = {
            _id: 'u1',
            name: 'Test',
            email: 'test@example.com',
            phone: '050-000',
            password: 'hashed',
            isManager: true,
            toObject: () => ({ _id: 'u1', name: 'Test', email: 'test@example.com', phone: '050-000' })
        };

        (User.findOne as jest.Mock).mockResolvedValue(fakeUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('tok123');

        await SignIn(req as Request, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            token: 'tok123',
            user: { ...fakeUser.toObject(), isManager: fakeUser.isManager }
        });
    });
});

describe('getUserTours', () => {
    let req: Partial<AuthRequest>;
    let res: Response;

    beforeEach(() => {
        req = { user: { _id: 'u1' } } as Partial<AuthRequest>;
        res = mockRes();
    });

    it('should return empty array when user has no tours', async () => {
        (User.findById as jest.Mock).mockReturnValue({
            populate: jest.fn().mockResolvedValue({ toursList: [] })
        });

        await getUserTours(req as AuthRequest, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should return tours array when user has tours', async () => {
        const tours = [{ _id: 't1' }, { _id: 't2' }];
        (User.findById as jest.Mock).mockReturnValue({
            populate: jest.fn().mockResolvedValue({ toursList: tours })
        });

        await getUserTours(req as AuthRequest, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(tours);
    });

    it('should handle errors and return 500', async () => {
        (User.findById as jest.Mock).mockReturnValue({
            populate: jest.fn().mockRejectedValue(new Error('fail'))
        });

        await getUserTours(req as AuthRequest, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'שגיאה בטעינת סיורי המשתמש' });
    });
});