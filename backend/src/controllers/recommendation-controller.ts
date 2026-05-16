import { Request, Response } from 'express';
import { RecommendationService } from '../services/recommendation-service';

const recommendationService = new RecommendationService();

export class RecommendationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      // Pega o userId que vai vir pela URL (ex: /recommendations/id-do-usuario)
      const { userId } = request.params;

      if (typeof userId !== 'string') {
        return response.status(400).json({ error: 'ID do usuário inválido.' });
      }

      const recommendations = await recommendationService.getRecommendations(userId);

      return response.status(200).json(recommendations);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro interno no servidor do motor de recomendações.' });
    }
  }
}