from dataclasses import field
from rest_framework import serializers
from .models import Document,SDG

class DocuemntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id','name','url', 'sdgs','sdg_strength')
        
class SDGSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDG
        fields = ('id','number','description','hex')
        
