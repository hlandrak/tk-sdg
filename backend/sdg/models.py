from pydoc import describe
from django.db import models
from django.contrib.postgres.fields import ArrayField
# Create your models here.

class Document(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    #sdgs = ArrayField(models.IntegerField()) #This doesn't work with giving a 1,1,1,1 strin 
    sdgs = models.CharField(max_length=255)
    def __str__(self) -> str:
        return self.name  
    

class SDG(models.Model):
    number = models.IntegerField()
    description = models.CharField(max_length=255)
    hex = models.CharField(max_length=10)
    
