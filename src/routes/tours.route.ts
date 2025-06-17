import { Router } from 'express';
import { addTour, deleteTour, getTours, updateTour } from '../controllers/tours.controller';
import { adminOnly, protect } from '../middlewares/users.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tours
 *   description: Tour management APIs
 */

/**
 * @swagger
 * /api/tours:
 *   get:
 *     summary: Get all tours
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of tours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   time:
 *                     type: string
 *                     format: date-time
 *                   invitingName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   note:
 *                     type: string
 *                   group:
 *                     type: boolean
 *                   tourType:
 *                     type: number
 */
router.get('/', protect, getTours);

/**
 * @swagger
 * /api/tours/addTour:
 *   post:
 *     summary: Add a new tour
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - time
 *               - invitingName
 *               - tourType
 *             properties:
 *               id:
 *                 type: number
 *               time:
 *                 type: string
 *                 format: date-time
 *               invitingName:
 *                 type: string
 *               phone:
 *                 type: string
 *               note:
 *                 type: string
 *               group:
 *                 type: boolean
 *               tourType:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Tour added
 *       '400':
 *         description: Tour already exists in this time
 *       '500':
 *         description: Server error
 */
router.post('/addTour', addTour);

/**
 * @swagger
 * /api/tours/updateTour:
 *   put:
 *     summary: Update an existing tour
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               time:
 *                 type: string
 *                 format: date-time
 *               invitingName:
 *                 type: string
 *               phone:
 *                 type: string
 *               note:
 *                 type: string
 *               group:
 *                 type: boolean
 *               tourType:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Tour updated successfully
 *       '400':
 *         description: Invalid ID or data
 *       '500':
 *         description: Server error
 */
router.put('/updateTour', adminOnly, updateTour);

/**
 * @swagger
 * /api/tours/deleteTour/{id}:
 *   delete:
 *     summary: Delete an existing tour
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The tour ID
 *     responses:
 *       '200':
 *         description: Tour deleted successfully
 *       '400':
 *         description: Invalid ID
 *       '500':
 *         description: Server error
 */
router.delete('/deleteTour/:id', adminOnly, deleteTour);

export default router;