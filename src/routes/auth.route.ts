import { Router } from 'express';
import { SignIn, SignUp } from '../controllers/user.controller';

const router = Router();

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
 *               isManager:
 *                 type: boolean
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
 *                 isManager:
 *                    type: boolean
 *                    example: true
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
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                  type: string
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

export default router;