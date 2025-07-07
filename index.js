const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/calcular', (req, res) => {
  const { peso, porcion, frecuencia } = req.body;
  const dosis = (porcion * frecuencia * 0.1) / peso;

  let nivel = 'BAJO';
  let recomendacion = 'Puede seguir consumiendo con normalidad.';

  if (dosis > 1.6 && dosis <= 2.5) {
    nivel = 'MODERADO';
    recomendacion = 'Reduzca el consumo a una vez por quincena.';
  } else if (dosis > 2.5) {
    nivel = 'ALTO';
    recomendacion = 'Evite consumir este tipo de atún.';
  }

  res.json({ dosis: dosis.toFixed(2), nivel, recomendacion });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

