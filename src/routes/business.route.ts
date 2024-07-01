import router from './user.route';
import { createBusiness, updateDetailsBusiness } from '../controllers/business.controller';

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: APIs for managing business information
 */

/**
 * @swagger
 * /api/business/createBusiness:
 *   post:
 *     summary: Create a new business instance
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               manager:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
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
 *                 manager:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@gmail.com
 *                 phone:
 *                   type: string
 *                   example: 055-5555555
 */
router.post('/createBusiness', createBusiness)

/**
 * @swagger
 * /api/business/updateDetailsBusiness:
 *   put:
 *     summary: update details business details
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               manager:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Business updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 60d32c5d0e58f40015a3f32c
 *                 manager:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@gmail.com
 *                 phone:
 *                   type: string
 *                   example: 055-5555555
 *       '404':
 *         description: Business not found
 *       '500':
 *         description: Server error
 */
router.put('/updateDetailsBusiness', updateDetailsBusiness)

export default router;
