import multer from 'multer';
import express from 'express';
import { fieldController } from '../../modules/field';
import { auth } from '../../modules/auth';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, '/Users/minhhoangnguyencuu/Dev/hoca/node-express-boilerplate/upload/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

router.route('/add').post(auth('manageUsers'), fieldController.createField);

router.route('/').get(fieldController.getAllFields);

router.route("/:field")
    .post(fieldController.getAnswer)

router.route('/:field/upload-pdf').put(auth('getUsers'), uploadStorage.single('file'), fieldController.uploadPdf);

export default router;

/**
 * @swagger
 * tags:
 *   name: Fields
 *   description: Fields management and retrieval
 */

/**
 * @swagger
 * /field/{field}/upload-pdf:
 *   put:
 *     summary: upload pdf for field
 *     description: Only admins can create other fields.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         description: Name of the field to be uploaded
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Field'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /field:
 *   get:
 *     summary: get add field
 *     description: Only admins can get fields.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Field'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /field/add:
 *   post:
 *     summary: Create a field
 *     description: Only admins can create other fields.
 *     tags: [Fields]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: fake name
 *               description: chatgpt description
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Field'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
