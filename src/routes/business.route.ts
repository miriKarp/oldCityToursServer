import router from './user.route';
import { getBusiness, createBusiness, updateBusiness } from '../controllers/business.controller';
import { protect, adminOnly } from '../middlewares/users.middleware';

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: APIs for managing business information
 */

/**
 * @swagger
 * /api/business:
 *   get:
 *     summary: Get first business details
 *     tags: [Business]
 *     responses:
 *       '200':
 *         description: Business details returned successfully
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
 *                 address:
 *                   type: string
 *                   example: רחוב הגליל 5, תל אביב
 *                 openingHours:
 *                   type: string
 *                   example: א'-ה' 09:00-17:00
 *       '404':
 *         description: Business not found
 *       '500':
 *         description: Server error
 */
router.get('/', getBusiness);

/**
 * @swagger
 * /api/business/createBusiness:
 *   post:
 *     summary: Create a new business instance
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
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
 *               address:
 *                 type: string
 *               openingHours:
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
 *                 address:
 *                   type: string
 *                   example: רחוב הרצל 10, ירושלים
 *                 openingHours:
 *                   type: string
 *                   example: א'-ה' 08:00-16:00
 */
router.post('/createBusiness', protect, adminOnly, createBusiness)

/**
 * @swagger
 * /api/business/updateBusiness:
 *   put:
 *     summary: update details business details
 *     tags: [Business]
 *     security:
 *       - bearerAuth: []
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
 *               address:
 *                 type: string
 *               openingHours:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Business updated successfully
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
 *                 address:
 *                   type: string
 *                   example: רחוב הגליל 5, תל אביב
 *                 openingHours:
 *                   type: string
 *                   example: א'-ה' 09:00-17:00
 *       '404':
 *         description: Business not found
 *       '500':
 *         description: Server error
 */
router.put('/updateBusiness', protect, adminOnly, updateBusiness)

export default router;
