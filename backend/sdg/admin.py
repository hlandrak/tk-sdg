from csv import list_dialects
from django.contrib import admin
from .models import Document
from .models import SDG

# Register your models here.
class DocuementAdmin(admin.ModelAdmin):
    list_display = ('name', 'url','sdgs','sdg_strength')

class SDGAdmin(admin.ModelAdmin):
    list_display =('number', 'description','hex')


#Registrer models here
admin.site.register(Document,DocuementAdmin)
admin.site.register(SDG,SDGAdmin)
