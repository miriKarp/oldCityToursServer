import { Router, Request, Response } from 'express';
import { getUsers } from '../controllers/user.controller';
import { SignIn, SignUp } from '../controllers/user.controller';
import { protect } from '../middlewares/users.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/users', protect, getUsers);

/**
 * @swagger
 * /api/users/signUp:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                  type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d32c5d0e58f40015a3f32c
 *                 password:
 *                   type: string
 *                   example: password
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@gmail.com
 *                 phone:
 *                    type: string
 *                    example: 055-5555555
 */
router.post('/signUp', SignUp);

/**
 * @swagger
 * /api/users/signIn:
 *   post:
 *     summary: connent exists user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - email
 *             properties:
 *               password:
 *                  type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d32c5d0e58f40015a3f32c
 *                 password:
 *                   type: string
 *                   example: password
 *                 email:
 *                   type: string
 *                   example: john.doe@gmail.com
 */
router.post('/signIn', SignIn);

router.get('/protected', protect, (req: Request, res: Response) => {
    res.status(200).json({ message: 'This is a protected route' });
});

export default router;

