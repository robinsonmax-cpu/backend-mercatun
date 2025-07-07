const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


const mercuryLevels = {
  blanco: 0.4,
  claro: 0.13,
  listado: 0.12,
  en_aceite: 0.18,
  en_agua: 0.09,
};


function calcularRiesgo({ tipoAtun, peso, porcion, frecuencia }) {
  const C = mercuryLevels[tipoAtun] || 0.13; 
  const dosis = (C * porcion * frecuencia) / peso; 

  let nivel = '';
  let recomendacion = '';

  if (dosis <= 1.4) {
    nivel = 'BAJO';
    recomendacion = 'El consumo actual en esta quincena es seguro.';
  } else if (dosis <= 3.2) {
    nivel = 'MODERADO';
    recomendacion = 'Considere reducir la frecuencia en esta quincena.';
  } else {
    nivel = 'ALTO';
    recomendacion = 'Reduzca el consumo en esta quincena o cambie el tipo de atún.';
  }

  return {
    dosis: dosis.toFixed(2),
    nivel,
    recomendacion,
  };
}



app.post('/api/calcular', (req, res) => {
  const datos = req.body;
  const resultado = calcularRiesgo(datos);
  res.json(resultado);
});


app.listen(PORT, () => {
  console.log(`Servidor MERCATUN corriendo en http://localhost:${PORT}`);
});

