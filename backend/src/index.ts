import express, { Request, Response } from 'express';
// 1. Importa as suas rotas de recomendação 
import { recommendationRoutes } from './routes/recommendation-routes';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ mensagem: "API funcionando!" });
});

// 2. Avisa o Express para usar suas rotas quando a URL começar com /recommendations
app.use('/recommendations', recommendationRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});