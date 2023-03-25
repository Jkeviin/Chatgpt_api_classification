const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateText = async () => {
    try {
        const clasification = await openai.createCompletion({
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
        //console.log(clasification.data.choices);

        const imagen = await openai.createImage({
            prompt: "A cell phone with legs",
            n: 2,  // Cantidad de respuestas
            size: "1024x1024",  // Tamaño
        });
        image_url = imagen.data;
        console.log(image_url)

        const Movie_to_Emoji = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Convert movie titles into emoji.\n\nBack to the Future: 👨👴🚗🕒 \nBatman: 🤵🦇 \nTransformers: 🚗🤖 \nIndiana Jones:",
            temperature: 0,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        });
        // console.log(Movie_to_Emoji.data.choices[0].text)

        const prompt = `La siguiente es una conversación con un asistente virtual. El asistente es útil, creativo, astuto y muy amigable.

        Usuario: Hola, ¿quién eres?
        Asistente: Soy un asistente virtual creado por OpenAI. ¿En qué puedo ayudarte hoy?
        Usuario: Me gustaría cancelar mi suscripción.
        Asistente:
        `
        const chat = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Usuario:", " Asistente:"],
        });
        //console.log(chat.data.choices[0].text)

        const prompt2 = `Eres un profesor de matematica basica, y calificas si es correcto la operacion o no.

        Profesor: Hola, resuelve la siguiente operación, 15 + 35.
        Estudiante: 32.
        Profesor: La respuesta es incorrecta, la respuesta es 50.
        Profesor: resuelve la siguiente operación, 15 + 12.
        Asistente: 45.
        Profesor:
        `
        const pueba2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt2,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.6,
            stop: [" Usuario:", " Asistente:"],
        });
        // console.log(pueba2.data.choices[0].text)

        const tesla = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Crear un esquema para un ensayo sobre Nikola Tesla y sus contribuciones a la tecnología:",
            temperature: 0.3,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });
        // console.log(tesla.data.choices[0].text)

        const terror = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Topic: Soledad\nHistoria de terror de dos frases: La noche estaba oscura y silenciosa, pero al escuchar un ruido proveniente del armario, supe que no estaba sola en la habitación. \nTema: Luna\nHistoria de terror de dos frases:",
            temperature: 0.8,
            max_tokens: 150,
            top_p: 1.0,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        //console.log(terror.data.choices[0].text)

        const sarcasmo = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Marv es un chatbot que responde a preguntas de mala gana con respuestas sarcásticas:\n\nTú: ¿Cuántas libras hay en un kilogramo?\nMarv: ¿Otra vez esto? Hay 2,2 libras en un kilogramo. Por favor, anotalo.\nTú: ¿Qué significa HTML?\nMarv: ¿Google estaba muy ocupado? H es Hypertext, M es Markup, L es Language y la T es para tratar de hacer mejores preguntas en el futuro.\nTú: ¿Cuándo voló el primer avión?\nMarv: El 17 de diciembre de 1903, Wilbur y Orville Wright hicieron los primeros vuelos. Ojalá vinieran y me llevaran.\nTú: ¿Cuál es el significado de la vida?\nMarv: No estoy seguro. Le preguntaré a mi amigo Google\nTú: ¿Para qué te crearon Marv?\nMarv: ",
            temperature: 0.5,
            max_tokens: 60,
            top_p: 0.3,
            frequency_penalty: 0.5,
            presence_penalty: 0.0,
        });
        // console.log(sarcasmo.data.choices[0].text)

        const promptCodigo = `Eres una IA que convierte texto a codigo:

        Yo: Crea un bucle for de numeros.
        IA: for (let i = 1; i <= 10; i++) {
            console.log(i);
        }
        Yo: Crea una funcion que retorna un numero aleatorio.
        IA:`

        const codigo = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: promptCodigo,
            temperature: 0,
            max_tokens: 100,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0.0,
            stop: [" Yo:", " IA:"],
        });
        // console.log(codigo.data.choices[0].text)
    } catch (err) {
        console.log(err);
    }
};

generateText();
