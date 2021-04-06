import requests

url = "https://google-search3.p.rapidapi.com/api/v1/news/q=president+united+states"

headers = {
    'x-rapidapi-key': "your key",
    'x-rapidapi-host': "google-search3.p.rapidapi.com"
    }

response = requests.request("GET", url, headers=headers)

print(response.text)
