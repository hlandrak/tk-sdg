import numbers
from pydoc import describe
from pyexpat import model
from unittest.util import _MAX_LENGTH
from wsgiref.validate import validator
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import validate_comma_separated_integer_list

# Create your models here.

class Document(models.Model):
    #saves the sdgs and the sdg_strength as a charfield, i.e. strings. 
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    #sdgs = ArrayField(models.CharField(max_length=1)) #This doesn't work with giving a 1,1,1,1 strin 
    sdgs = models.CharField(validators=[validate_comma_separated_integer_list],max_length=33)
    sdg_strength = models.CharField(max_length=33)
    sdg1 = models.CharField(max_length=2500,default=0)
    sdg2 = models.CharField(max_length=2500,default=0)
    sdg3 = models.CharField(max_length=2500,default=0)
    sdg4 = models.CharField(max_length=2500,default=0)
    sdg5 = models.CharField(max_length=2500,default=0)
    sdg6 = models.CharField(max_length=2500,default=0)
    sdg7 = models.CharField(max_length=2500,default=0)
    sdg8 = models.CharField(max_length=2500,default=0)
    sdg9 = models.CharField(max_length=2500,default=0)
    sdg10 = models.CharField(max_length=2500,default=0)
    sdg11 = models.CharField(max_length=2500,default=0)
    sdg12 = models.CharField(max_length=2500,default=0)
    sdg13 = models.CharField(max_length=2500,default=0)
    sdg14 = models.CharField(max_length=2500,default=0)
    sdg15 = models.CharField(max_length=2500,default=0)
    sdg16 = models.CharField(max_length=2500,default=0)
    sdg17 = models.CharField(max_length=2500,default=0)
    def __str__(self):   
        return self.name  
    

class SDG(models.Model):
    number = models.IntegerField()
    description = models.CharField(max_length=255)
    hex = models.CharField(max_length=10)
    def __str__(self):   
        return self.description  
    
