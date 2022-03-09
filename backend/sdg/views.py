from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DocuemntSerializer,SDGSerializer
from .models import Document, SDG

# Create your views here.

class DocumentView(viewsets.ModelViewSet):
    serializer_class = DocuemntSerializer
    queryset = Document.objects.all()
    
class SDGView(viewsets.ModelViewSet):
    serializer_class = SDGSerializer
    queryset = SDG.objects.all()