import { Router } from 'express';
import { getServices, addService, deleteService, updateService } from '../controllers/services.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management APIs
 */

/**
 * @swagger
 * /api/services/services:
 *   get:
 *     summary: Retrieve all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   durationTime:
 *                     type: number
 */
router.get('/services', getServices);

/**
 * @swagger
 * /api/services/addService:
 *   post:
 *     summary: Add a new service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - price
 *               - durationTime
 *             properties:
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               durationTime:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Service created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 durationTime:
 *                   type: number
 *       '500':
 *         description: Server error
 */
router.post('/addService', addService);

/**
 * @swagger
 * /api/services/updateService:
 *   put:
 *     summary: Update an existing service
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - description
 *               - price
 *               - durationTime
 *             properties:
 *               id:
 *                 type: number
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               durationTime:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Service updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 durationTime:
 *                   type: number
 *       '404':
 *         description: Service not found
 *       '500':
 *         description: Server error
 */
router.put('/updateService', updateService);

/**
 * @swagger
 * /api/services/deleteService/{serviceId}:
 *   delete:
 *     summary: Delete a service by id
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the service to delete
 *     responses:
 *       '200':
 *         description: Service deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Service deleted successfully
 *                 business:
 *                   $ref: '#/components/schemas/Business'
 *       '404':
 *         description: Business or service not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Business not found
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete service
 */
router.delete('/deleteService/:serviceId', deleteService);


export default router;
