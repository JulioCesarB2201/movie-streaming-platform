import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class RecommendationService {
  async getRecommendations(userId: string) {
    // 1. Buscar o histórico do usuário para saber se ele é novo
    const userHistory = await prisma.history.findMany({
      where: { userId: userId },
    });

    // 2.Se o histórico estiver vazio (Usuário Novo)
    if (userHistory.length === 0) {
      // Busca no banco os filmes marcados como populares
      const popularMovies = await prisma.movie.findMany({
        where: { isPopular: true },
        take: 10, // Limita a 10 filmes 
      });

      return {
        sectionTitle: "Lançamentos e Populares",
        movies: popularMovies,
      };
    }

    // 3. Se ele tiver histórico, por enquanto retorna vazio 
    return {
      sectionTitle: "Personalizados",
      movies: [],
    };
  }
}