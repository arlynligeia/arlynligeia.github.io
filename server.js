const express = require('express');
const mercadopago = require('mercadopago');
const app = express();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://arlynligeia.github.io');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.post('/process-payment', async (req, res) => {
  try {
    // 🔴 TEMPORAL: DEBUG PARA VER QUÉ FALLA
    console.log('✅ Backend recibió petición');
    console.log('🔑 ACCESS_TOKEN existe?:', process.env.ACCESS_TOKEN ? 'SÍ' : 'NO');
    
    const { token, amount, description, paymentMethodId } = req.body;
    console.log('📦 Datos recibidos:', { 
      token: token ? 'SI' : 'NO', 
      amount: amount,
      paymentMethodId: paymentMethodId 
    });
    // 🔴 FIN TEMPORAL

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

    // 🔴 TEMPORAL: DEBUG DEL PAGO
    console.log('🔄 Enviando pago a Mercado Pago...');
    const result = await mercadopago.payment.create(paymentData);
    console.log('📋 Respuesta Mercado Pago status:', result.body.status);
    console.log('📋 Respuesta Mercado Pago mensaje:', result.body.message);
    // 🔴 FIN TEMPORAL
    
    if (result.body.status === 'approved') {
      res.json({ success: true, message: 'Pago aprobado' });
    } else {
      res.json({ success: false, message: result.body.message || 'Pago rechazado' });
    }
  } catch (error) {
    // 🔴 TEMPORAL: DEBUG DEL ERROR
    console.log('❌ ERROR completo:', error);
    // 🔴 FIN TEMPORAL
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
