export async function mistralAPI(apiKey,question){
    const mistral = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free", // Optional (user controls the default),
        "messages": [
          {"role": "user", "content": question},
        ]
      })
    });
    return mistral.json();
  }