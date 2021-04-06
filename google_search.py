import requests

url = "https://google-search3.p.rapidapi.com/api/v1/news/q=president+united+states"

headers = {
    'x-rapidapi-key': "b64d452b40mshc4e0459148c0016p11b5eajsn727b13eeebd2",
    'x-rapidapi-host': "google-search3.p.rapidapi.com"
    }

response = requests.request("GET", url, headers=headers)

print(response.text)