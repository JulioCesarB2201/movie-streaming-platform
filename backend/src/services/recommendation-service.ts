import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class RecommendationService {
  
  // LÓGICA PARA A ROTA /recommendations/trending
  async getTrendingMovies() {
    const filmesPopulares = await prisma.movie.findMany({
      where: { isPopular: true },
      take: 10,
    });

    return {
      sectionTitle: "Lançamentos e Populares",
      movies: filmesPopulares,
    };
  }

  // LÓGICA PARA A ROTA /recommendations/genres/:userId
  async getGenreRecommendations(userId: string) {
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

    const historicoRecente = await prisma.history.findMany({
      where: {
        userId: userId,
        watchedAt: { gte: seteDiasAtras }
      },
      include: { movie: true }
    });

    // Se não tem histórico recente, avisa ou pode sugerir chamar os populares
    if (historicoRecente.length === 0) {
      return {
        message: "Assista mais conteúdos para gerar recomendações por gênero",
        sectionTitle: "Recomendações de Gênero",
        movies: []
      };
    }

    const contagemGeneros: Record<string, number> = {};
    historicoRecente.forEach(registro => {
      const genero = registro.movie.genre;
      contagemGeneros[genero] = (contagemGeneros[genero] || 0) + 1;
    });

    let generoFavorito = "";
    let maiorContagem = 0;
    for (const [genero, quantidade] of Object.entries(contagemGeneros)) {
      if (quantidade > maiorContagem) {
        maiorContagem = quantidade;
        generoFavorito = genero;
      }
    }

    // Regra dos 3 filmes mínimos
    if (maiorContagem < 3) {
      return {
        message: "Assista mais conteúdos desse gênero para personalizar sua lista",
        sectionTitle: `Recomendações de ${generoFavorito}`,
        movies: [],
      };
    }

    const idsFilmesAssistidos = historicoRecente.map(h => h.movieId);
    const recomendacoesGenero = await prisma.movie.findMany({
      where: {
        genre: generoFavorito,
        id: { notIn: idsFilmesAssistidos }
      },
      take: 5
    });

    return {
      sectionTitle: `Recomendações de ${generoFavorito}`,
      movies: recomendacoesGenero,
    };
  }
}