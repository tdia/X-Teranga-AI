import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Demo Request
  app.post("/api/demo-request", (req, res) => {
    const { name, email, company, message } = req.body;

    console.log("--- NOUVELLE DEMANDE DE DÉMO ---");
    console.log(`Destinataire: tidiane.dia@xamle.io`);
    console.log(`Nom: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Entreprise: ${company}`);
    console.log(`Message: ${message}`);
    console.log("--------------------------------");

    // Ici, vous pourriez intégrer un service comme Resend, SendGrid ou Nodemailer
    // Exemple avec Resend (nécessite une clé API) :
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'TerangaAI <demo@teranga-ai.com>',
      to: 'tidiane.dia@xamle.io',
      subject: `Nouvelle demande de démo de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company}\nMessage: ${message}`,
    });
    */

    res.status(200).json({ 
      success: true, 
      message: "Votre demande a été envoyée avec succès à tidiane.dia@xamle.io" 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
