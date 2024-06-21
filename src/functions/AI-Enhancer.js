function Enhance(sentence) {
  let context = `evite les formalité donne juste ce que je te demande et en Français s'il te plait . réformule ce texte " ${sentence} " selon l'ambiance qu'il y a deja , améliore l'énonciation selon le texte lui même ,rend le convaincant. Raoute des émoji si nééssaire.  `;
  return new Promise((resolve, reject) => {
    const url = "https://open-ai21.p.rapidapi.com/chatgpt";
    const API_KEY = process.env.AI_API_KEY;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": API_KEY /**Eviter d'utiliser l'API sauf en demo */,
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: context,
          },
        ],
        web_access: false,
      }),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Réponse d'API non réussie : ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        console.log(
          `il ya une erreur au niveau de la fonction de GPT  : ${error}`
        );
        reject(error);
      });
  });
}
export default Enhance;