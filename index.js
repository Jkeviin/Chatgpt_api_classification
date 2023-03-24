const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateText = async () => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Por favor clasifica la siguiente frase: 'El nuevo restaurante de la ciudad tiene una comida y servicio excelentes.'",
            temperature: 0,
            /*
            temperature:
            controla la "creatividad" de las respuestas generadas por el modelo.
            Un valor de 0 produce respuestas más predecibles y conservadoras,
            mientras que un valor más alto permite respuestas más variadas y creativas.
            En este caso, el valor es 0, lo que indica que se prefieren respuestas predecibles y precisas.
            */
            max_tokens: 64,
            /*
            max_tokens:
            Este parámetro limita el número máximo de palabras que se generarán en la respuesta. En este caso, se ha establecido en 64.
            */
            top_p: 1.0,
            /*
            top_p:
            Este parámetro también afecta a la creatividad del modelo,
            controlando la probabilidad acumulada de las palabras que se generan.
            Un valor más alto significa que el modelo considerará más opciones para cada palabra,
            lo que puede generar resultados más creativos. En este caso, se ha establecido en 1,
            lo que significa que se considerarán todas las opciones posibles.
            */
            n: 2,
            /*
            n:
            Indica cuántas respuestas diferentes se generarán. En este caso, solo se generará una respuesta.
            */
            stream: false,
            /*
            "stream": este parámetro indica si la respuesta se enviará en un flujo
            continuo o se recibirá en una sola llamada. En este caso,
            se ha establecido en "false", lo que significa que se recibirá la respuesta en una sola llamada.
            */
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        //console.log(response.data.choices);

        const imagen = await openai.createImage({
            prompt: "A red cat",
            n: 2,  // Cantidad de respuestas
            size: "1024x1024",  // Tamaño
        });
        image_url = imagen.data;
        //console.log(image_url)

        const Movie_to_Emoji = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \nIndiana Jones:",
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        });
        console.log(Movie_to_Emoji.data.choices[0].text)

        

    } catch (err) {
        console.log(err);
    }
};



generateText();
