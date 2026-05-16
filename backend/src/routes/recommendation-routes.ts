import { Router } from 'express';
import { RecommendationController } from '../controllers/recommendation-controller';

const recommendationRoutes = Router();
const recommendationController = new RecommendationController();

recommendationRoutes.get('/:userId', recommendationController.handle);

export { recommendationRoutes };