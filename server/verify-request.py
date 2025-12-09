import requests
import json

try:
    print("Testing DELETE /invoices/2 with Accept-Language: vi")
    response = requests.delete('http://localhost:3000/invoices/2', headers={'Accept-Language': 'vi'})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
