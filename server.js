const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB Atlas (sin opciones obsoletas)
mongoose.connect('mongodb+srv://adamhrzeta:Espinosaurio22@clusterpractica01.c8ced.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPractica01')
    .then(() => {
        console.log('Conectado a MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error conectando a MongoDB Atlas:', err);
    });

// Definir un modelo de ejemplo
const Schema = mongoose.Schema;
const ExampleSchema = new Schema({ name: String });
const ExampleModel = mongoose.model('Example', ExampleSchema);

// Endpoint para obtener datos
app.get('/examples', async (req, res) => {
    try {
        const examples = await ExampleModel.find();
        res.json(examples);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint para agregar datos
app.post('/examples', async (req, res) => {
    try {
        const newExample = new ExampleModel({ name: req.body.name });
        await newExample.save();
        res.status(201).json(newExample);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});