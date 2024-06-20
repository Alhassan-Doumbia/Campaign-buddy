import React from "react";
import { useState } from "react";
import { SmsOrange } from 'smsorange'
function TextArea() {
  const infinityLogo = (
    <svg
      fill="#FFFFFF"
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.288 9.463a4.856 4.856 0 0 0-4.336-2.3 4.586 4.586 0 0 0-3.343 1.767c.071.116.148.226.212.347l.879 1.652.134-.254a2.71 2.71 0 0 1 2.206-1.519 2.845 2.845 0 1 1 0 5.686 2.708 2.708 0 0 1-2.205-1.518L13.131 12l-1.193-2.26a4.709 4.709 0 0 0-3.89-2.581 4.845 4.845 0 1 0 0 9.682 4.586 4.586 0 0 0 3.343-1.767c-.071-.116-.148-.226-.212-.347l-.879-1.656-.134.254a2.71 2.71 0 0 1-2.206 1.519 2.855 2.855 0 0 1-2.559-1.369 2.825 2.825 0 0 1 0-2.946 2.862 2.862 0 0 1 2.442-1.374h.121a2.708 2.708 0 0 1 2.205 1.518l.7 1.327 1.193 2.26a4.709 4.709 0 0 0 3.89 2.581h.209a4.846 4.846 0 0 0 4.127-7.378z" />
    </svg>
  );

  const [enhanced, setEnhanced] = useState({
    text: "",
    ready:true
  });
  function updateText(e) {
    let value = e.target.value;
    setEnhanced({
      ...enhanced,
      text: value,
    });
  }

  function Enhancer() {
    let toEnhance = enhanced.text;
    let context = `evite les formalité retourne juste le résultat de ce que je te demande et en Français s'il te plait . réformule ce texte " ${toEnhance} " selon l'ambiance qu'il y a deja , améliore l'énonciation selon le texte lui même ,rend le convaincant. Raoute des émoji si nééssaire.  `;
    return new Promise((resolve, reject) => {
      const url = "https://open-ai21.p.rapidapi.com/chatgpt";
      //   const API_KEY = process.env.AI_API_KEY;
      const API_KEY = "45539c1454mshe2988be1e97c2cfp173326jsn950d6de2fb8f"; // je dois trouver un bon moyens d'invisibiliser la clé API
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": API_KEY,
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
            throw new Error(
              `Réponse d'API non réussie : ${response.statusText}`
            );
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
  async function Enhance(e) {
    e.preventDefault();
    try {
     // affiche rle loader 
     setEnhanced({...enhanced,ready:false})
      const response = await Enhancer();
    setEnhanced({...enhanced, ready:true})
    //supprimer le loader 
      const enhancedText = JSON.stringify(response.result);
      setEnhanced({...enhanced, text: enhancedText });
    } catch (error) {
      console.error(`Error enhancing text: ${error}`);
    }
  }


  async function LaunchCampaign(PhoneNumberArray,phoneNumber) {
    const smsWrapper = new SmsOrange(
        {authorization_header:"<Your Authorization header>",
        yourNumber: `${phoneNumber}`,
        senderName: "<Sender Name or Service Name>"}
    )
    const response=await smsWrapper.sendSms({numberTo:PhoneNumberArray});
    

  }
  const phoneNumberArray = []; // model des numéros de téléphones : prefix + number (+225XXXXXXXX)
  return (
    <form className=" flex-col min-w-[850px] w-fit h-[440px] bg-gray-200 rounded-xl flex gap-2 px-6 py-4 ">
      <p className=" text-lg font-DM font-bold">
        Send your messages ( they will surely like it ){" "}
      </p>
         {
            !enhanced.ready ? <div id="loader" className=" rounded-lg flex items-center justify-center w-[800px] h-[255px] absolute mt-8 bg-black/30  backdrop-blur-sm ">                                
            <div class="text-center">
                <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
                <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                <p class="text-white">
                    AI is crafting your text , making it better !!!!
                </p>
             </div> 
          
          </div> : null
         }
      <textarea
        onChange={updateText}
        value={enhanced.text}
        className=" outline-none px-4 py-4 font-DM w-full h-[250px] rounded-lg"
        name=""
        id="textZone"
        placeholder="type the message here kiddo !"
      ></textarea>
      <div id="ActionArea" className="w-full h-fit flex gap-2  items-center">
        <button className=" px-3 py-3 bg-slate-900 text-slate-100 font-DM text-sm font-bold rounded-sm hover:bg-slate-700 hover:transition-all hover:ease-in hover:duration-150 cursor-pointer ">
          Launch the campaign{" "}
        </button>
        <div className=" font-DM h-full  flex gap-1 items-center">
          <button
            onClick={Enhance}
            className=" cursor-pointer hover:bg-orange-600 hover:transition-all hover:ease-in hover:duration-150  w-[36px] h-[36px] flex items-center justify-center  bg-orange-500 rounded-full"
          >
            {infinityLogo}
          </button>
          <div className="px-4 py-1  flex items-center rounded-sm border-2 border-gray-400 h-6 text-gray-400 text-[11px]">
            <p>(beta) enhance with AI </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TextArea;
