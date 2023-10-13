import express from 'express';
import { 
    createUser, 
    bookVisit, 
    getBookedVisits, 
    cancelBookedVisit, 
    toFavorites,
    getFavorites
 } from '../controllers/user.js';

const router = express.Router();

router.post('/create', createUser);
router.post('/bookVisit/:id', bookVisit);
router.post('/visits', getBookedVisits);
router.post('/cancelVisit/:id', cancelBookedVisit);
router.post('/toFavorites/:id', toFavorites);
router.post('/favorites', getFavorites);

export { router as userRoute };

