import azure.functions as func
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="message", auth_level=func.AuthLevel.ANONYMOUS)
def message(req: func.HttpRequest) -> func.HttpResponse:
    city = req.params.get('city')
    return func.HttpResponse(
        json.dumps({
            "city": city if city else "Unknown",
            "advice": "System Online! Your AgriCloud API is working perfectly."
        }),
        mimetype="application/json"
    )
