import { Header } from "../../components/Header";
import { RecommendedSection } from "../../components/RecommendedSection";
import type { Movie } from "../../types";
import "./RecomendadosPage.css";

interface RecomendadosPageProps {
  userId: string;
  onGoToHome: () => void;
  onGoToPlaylists: () => void;
  onGoToHistory: () => void;
  onGoToRecommendations: () => void;
  onSelectMovie: (movie: Movie) => void;
}

export function RecomendadosPage({
  userId,
  onGoToHome,
  onGoToPlaylists,
  onGoToHistory,
  onGoToRecommendations,
  onSelectMovie,
}: RecomendadosPageProps) {
  return (
    <div className="home-page">
      <Header
        activePage="recommendations"
        onGoToHome={onGoToHome}
        onGoToPlaylists={onGoToPlaylists}
        onGoToHistory={onGoToHistory}
        onGoToRecommendations={onGoToRecommendations}
        onLogout={() => console.log("Usuário deslogado")}
      />

      <main className="home-content">
        <section className="home-hero">
          <p className="home-eyebrow">Personalizado</p>
          <h1>Recomendações</h1>
          <p>Descubra filmes selecionados especialmente para você com base no seu perfil.</p>
        </section>

        <RecommendedSection
          userId={userId}
          onSelectMovie={onSelectMovie}
        />
      </main>
    </div>
  );
}
