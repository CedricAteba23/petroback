// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Remplace par ton Gmail et ton mot de passe d'application
const GMAIL_USER = "acedricarmel@gmail.com";
const GMAIL_APP_PASSWORD = "fuah zffq bmhh feot";

app.post("/send-mail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send({ success: false, error: "Tous les champs sont requis" });
  }

  try {
    // Création du transporteur
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    // Options de l'email
    let mailOptions = {
      from: GMAIL_USER, // Toujours ton email Gmail
      to: "atebacedric06@gmail.com", // Ton email de réception
      subject: subject,
      text: `
Nom: ${name}
Email du client: ${email}

Message:
${message}
`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé : " + info.response);

    res.send({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur en envoyant l'email:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});