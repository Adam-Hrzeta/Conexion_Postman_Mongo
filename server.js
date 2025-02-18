require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors()); 

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error(' Error al conectar:', err));

const EjemploSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    fecha: { type: Date, default: Date.now }
});
const Ejemplo = mongoose.model('Ejemplo', EjemploSchema);

app.get('/ejemplos', async (req, res) => {
    const ejemplos = await Ejemplo.find();
    res.json(notas);
});

app.post('/ejemplos', async (req, res) => {
    const nuevoEjemplo = new Ejemplo(req.body);
    await nuevoEjemplo.save();
    res.json({ mensaje: 'Ejemplo agregado', nota: nuevoEjemplo });
});


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
