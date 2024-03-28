import dotenv from 'dotenv';
dotenv.config();

//Get the data from Mistral depending on the question
export const mistralAPI = async (question = {}) => {
  try{
    const mistral = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY_MISTRAL}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
          {"role": "user", "content": question},
        ]
      })
    });
    return mistral.json();
  }
  catch (error) {
    throw new Error('Mistral API request failed', error);
  }
};