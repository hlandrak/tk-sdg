from dataclasses import field
from rest_framework import serializers
from .models import Document,SDG

class DocuemntSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id','name','url', 'sdgs','sdg_strength','sdg1','sdg2','sdg3','sdg4','sdg5','sdg6','sdg7','sdg8','sdg9','sdg10','sdg11','sdg12','sdg13','sdg14','sdg15','sdg16','sdg17')
        
class SDGSerializer(serializers.ModelSerializer):
    class Meta:
        model = SDG
        fields = ('id','number','description','hex')
        
