import { Router, Request, Response } from 'express';
import { getUsers, getUserTours } from '../controllers/user.controller';
import { adminOnly, protect } from '../middlewares/users.middleware';

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
 *       - bearerAuth: []
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
router.get('/', adminOnly, getUsers);

/**
 * @swagger
 * /api/users/my-tours:
 *   get:
 *     summary: Get the tours list for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of the user's invited tours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   invitingName:
 *                     type: string
 *                     description: Name of the inviter
 *                   phone:
 *                     type: string
 *                   time:
 *                     type: string
 *                     format: date-time
 *                   note:
 *                     type: string
 *                   tourType:
 *                     type: string
 *                   group:
 *                     type: boolean
 *       '401':
 *         description: Unauthorized – no token or invalid token
 *       '500':
 *         description: Internal server error
 */
router.get('/my-tours', protect, getUserTours);


export default router;

