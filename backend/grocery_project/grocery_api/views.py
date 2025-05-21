from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
class ProductListView(APIView):
    def get(self,request):
        category=request.query_params.get('category','all')
        valid_categories=['all','fruits','drinks','bakery']
        
        if category not in valid_categories:
            return Response({"error":f"Invalid category. Choose from {', '.join(valid_categories)}"},
                status=status.HTTP_400_BAD_REQUEST)
        api_url=f"https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category={category}"   
        try:
            response=requests.get(api_url)
            if response.status_code==200: 
                return Response(response.json())
            else:
                return Response(
                    {"error": f"External API returned status code {response.status_code}"},
                    status=response.status_code
                )
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": f"Failed to connect to external API: {str(e)}"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
            
