const express = require('express');
const mercadopago = require('mercadopago');
const app = express();
mercadopago.configure({
access_token: process.env.ACCESS_TOKEN
});
// 🔴 AGREGA ESTO PARA CORS - PERMITE TU PÁGINA DE GITHUB
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'https://arlynligeia.github.io');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
});
app.use(express.json());
app.post('/process-payment', async (req, res) => {
try {
const { token, amount, description, paymentMethodId } = req.body;
const paymentData = {
transaction_amount: amount,
token: token,
description: description,
installments: 1,
payment_method_id: paymentMethodId || 'visa',
payer: {
email: 'customer@email.com'
}
};
const result = await mercadopago.payment.create(paymentData);
if (result.body.status === 'approved') {
res.json({ success: true, message: 'Pago aprobado' });
} else {
res.json({ success: false, message: 'Pago rechazado' });
}
} catch (error) {
res.status(500).json({ success: false, message: error.message });
}
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Backend running on port ${PORT}`);
});
