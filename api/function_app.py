import azure.functions as func
import json
import requests

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="message", auth_level=func.AuthLevel.ANONYMOUS)
def message(req: func.HttpRequest) -> func.HttpResponse:
    name = req.params.get('name', 'Farmer')
    city = req.params.get('city', 'Jalingo')
    crop = req.params.get('crop', 'General') # This captures the crop
    
    # FETCH REAL WEATHER
    api_key = "b2b8945ab53a56945813d94fa379ed13" # Make sure your real key is here
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    try:
        response = requests.get(url)
        data = response.json()
        temp = data['main']['temp']
    except:
        temp = 38 

    # SCORING LOGIC
    score = 95 if 22 <= temp <= 30 else 70 if 31 <= temp <= 35 else 40 if temp > 35 else 50
    status = "Excellent" if score == 95 else "Good" if score == 70 else "Bad" if score == 40 else "Mild"

    return func.HttpResponse(
        json.dumps({
            "farmer": name,
            "city": city,
            "crop": crop,  # <--- THIS WAS THE MISSING LINE
            "temp": f"{temp}°C",
            "score": f"{score}%",
            "rating": status,
            "advice": f"At {temp}°C, conditions for {crop} are {status}."
        }),
        mimetype="application/json"
    )
