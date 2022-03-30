from csv import list_dialects
from django.contrib import admin
from .models import Document
from .models import SDG
from import_export import resources
from import_export.admin import ImportExportModelAdmin

# Register your models here.
"""
class DocumentResource(resources.ModuleResource):
    class Meta:
        module = Document
        

class DocuemntAdmin2(ImportExportModelAdmin):   
    resource_class = DocumentResource
"""

class DocuementAdmin(admin.ModelAdmin):
    list_display = ('name', 'url','sdgs','sdg_strength','sdg1','sdg2','sdg3','sdg4','sdg5','sdg6','sdg7','sdg8','sdg9','sdg10','sdg11','sdg12','sdg13','sdg14','sdg15','sdg16','sdg17')
    
    
class SDGAdmin(admin.ModelAdmin):
    list_display =('number', 'description','hex')




#Registrer models here
admin.site.register(Document,DocuementAdmin)
admin.site.register(SDG,SDGAdmin)
#admin.site.register(Document,DocuemntAdmin2)