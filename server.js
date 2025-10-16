const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

app.use(express.json());

app.post('/process-payment', async (req, res) => {
  try {
    const { token, amount, description } = req.body;

    const paymentData = {
      transaction_amount: amount,
      token: token,
      description: description,
      installments: 1,
      payment_method_id: req.body.paymentMethodId || 'visa', // <-- DETECTA AUTOMÁTICAMENTE
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
