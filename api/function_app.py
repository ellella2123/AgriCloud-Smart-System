import azure.functions as func
import json
import requests

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="message", auth_level=func.AuthLevel.ANONYMOUS)
def message(req: func.HttpRequest) -> func.HttpResponse:
    name = req.params.get('name', 'Farmer')
    city = req.params.get('city', 'Jalingo')
    crop = req.params.get('crop', 'General')
    
    # 1. FETCH REAL WEATHER
    # Replace the 'PASTE_KEY_HERE' with your key from Step 1
    api_key = "PASTE_YOUR_OPENWEATHER_KEY_HERE"
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    try:
        response = requests.get(url)
        data = response.json()
        temp = data['main']['temp']
    except:
        temp = 38 # Fallback for Jalingo if API is still activating

    # 2. SCORING LOGIC (The "AI" Expert)
    score = 0
    status = ""
    
    # Logic: Most crops hate extreme heat (>35C) or extreme cold (<10C)
    if 22 <= temp <= 30:
        score = 95
        status = "Excellent"
    elif 31 <= temp <= 35:
        score = 70
        status = "Good"
    elif temp > 35:
        score = 40
        status = "Bad (Too Hot)"
    else:
        score = 50
        status = "Mild"

    return func.HttpResponse(
        json.dumps({
            "farmer": name,
            "city": city,
            "temp": f"{temp}°C",
            "score": f"{score}%",
            "rating": status,
            "advice": f"At {temp}°C, conditions for {crop} are {status}. " + 
                      ("Provide extra shade/water!" if temp > 35 else "Perfect time to work.")
        }),
        mimetype="application/json"
    )
