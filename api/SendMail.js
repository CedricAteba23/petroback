import nodemailer from "nodemailer";

export default async function handler(req, res) {

// CORS
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method !== "POST") {
return res.status(405).json({ message: "Method not allowed" });
}

const { name, email, subject, message } = req.body;

try {

const transporter = nodemailer.createTransport({

service: "gmail",

auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}

});

await transporter.sendMail({

from: process.env.EMAIL_USER,

to: "atebacedric06@gmail.com",

subject: subject,

text: `
Nom: ${name}
Email: ${email}

Message:
${message}
`

});

return res.status(200).json({ success: true });

} catch (error) {

return res.status(500).json({ error: error.message });

}

}