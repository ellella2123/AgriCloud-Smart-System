import azure.functions as func
import json
import requests # Note: This requires 'requests' in requirements.txt

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="message", auth_level=func.AuthLevel.ANONYMOUS)
def message(req: func.HttpRequest) -> func.HttpResponse:
    city = req.params.get('city')
    # Use your real API Key here
    api_key = "b2b8945ab53a56945813d94fa379ed13"
    
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
    r = requests.get(url)
    data = r.json()
    
    temp = round(data['main']['temp'] - 273.15) # Kelvin to Celsius
    
    return func.HttpResponse(
        json.dumps({
            "city": city,
            "advice": f"It is {temp}°C. " + ("Perfect for planting!" if temp > 20 else "Careful, it's chilly!")
        }),
        mimetype="application/json"
    )
