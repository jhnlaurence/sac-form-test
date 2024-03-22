import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FormsDataService {
    //will create the json file
    saveFormData(formData: any, fileName: string) {
        const jsonData = JSON.stringify(formData);
        const blob = new Blob([jsonData], { type: 'application/json' });
        saveAs(blob, `${fileName}-data.json`);
    }
}
