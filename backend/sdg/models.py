from pydoc import describe
from wsgiref.validate import validator
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import validate_comma_separated_integer_list

# Create your models here.

class Document(models.Model):
    #saves the sdgs and the sdg_strength as a charfield, i.e. strings. 
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=255)
    #sdgs = ArrayField(models.IntegerField()) #This doesn't work with giving a 1,1,1,1 strin 
    sdgs = models.CharField(validators=[validate_comma_separated_integer_list],max_length=33)
    sdg_strength = models.CharField(max_length=255)
    def __str__(self) -> str:   
        return self.name  
    

class SDG(models.Model):
    number = models.IntegerField()
    description = models.CharField(max_length=255)
    hex = models.CharField(max_length=10)
