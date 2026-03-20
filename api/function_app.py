import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# This is our "AI Knowledge Base"
AI_TIPS = {
    "maize": "Plant maize when the soil is warm. Ensure 2 inches of depth.",
    "rice": "Rice needs plenty of water. Check your irrigation channels today.",
    "beans": "Beans grow fast! Watch for aphids on the leaves.",
    "default": "Always check soil moisture before adding fertilizer."
}

@app.route(route="message", auth_level=func.AuthLevel.ANONYMOUS)
def message(req: func.HttpRequest) -> func.HttpResponse:
    # Get data from the user
    city = req.params.get('city')
    farmer_name = req.params.get('name')
    crop = req.params.get('crop')
    chat_query = req.params.get('query')

    # 1. Logic for AI Chatbot
    ai_response = ""
    if chat_query:
        query = chat_query.lower()
        if "plant" in query or "how to" in query:
            ai_response = AI_TIPS.get(crop.lower() if crop else "default", AI_TIPS["default"])
        elif "weather" in query:
            ai_response = f"The weather in {city} looks promising for your {crop}!"
        else:
            ai_response = "I'm your Agri-Assistant. Ask me about planting or weather!"

    # 2. Return everything to the Dashboard
    return func.HttpResponse(
        json.dumps({
            "farmer": farmer_name if farmer_name else "Guest",
            "city": city,
            "crop": crop,
            "ai_advice": ai_response,
            "weather_temp": "24°C" # We'll keep this simple for now
        }),
        mimetype="application/json"
    )
