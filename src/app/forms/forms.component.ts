import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsDataService } from '../services/forms-data.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  combinedForm: FormGroup;
  phRegion : { region_name: string, province_list: string, municipality_list: string, barangay_list:string}[] = [];


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private formDataService: FormsDataService) {
    this.combinedForm = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      birthday: [null, Validators.required],
      typeId: [null, Validators.required],
      validId: [0, Validators.required],
      monthSalary: [null, Validators.required],
      phoneNum: [null, [Validators.maxLength(12), Validators.required]],

      address_Tirahan: [null, Validators.required],
      address_Street: [null, Validators.required],
      address_Brgy: [null, Validators.required],
      address_City: [null, Validators.required],
      address_Province: [null, Validators.required],
      address_Region: [null, Validators.required],
      
      bnfUCT: [false, Validators.required],
      bnf4ps: [false, Validators.required],
      bnfGroup: [false, Validators.required],
      bnfOther: [false, Validators.required],
      bnfOtherInfo: [null],

      familyMembers: this.formBuilder.array([this.createFamilyMemberFormGroup()])
      
    });
  }

  ngOnInit() {
    this.http.get<any>('assets/data/philippines/regionList.json').subscribe(data => {
      this.phRegion = data;
      console.log(this.phRegion);
    });
    
  }

  get formsValues(){
    return this.combinedForm.value;
  }

  get familyMembers() {
    return this.combinedForm.get('familyMembers') as FormArray;
  }

  addFamilyMember() {
    this.familyMembers.push(this.createFamilyMemberFormGroup());
  }

  removeInput(index: number) {
    this.familyMembers.removeAt(index);
  }

  createFamilyMemberFormGroup() {
    return this.formBuilder.group({
      famName: [null, Validators.required],
      famRelation: [null, Validators.required],
      famBirth: [null, Validators.required],
      famGender: [null, Validators.required],
      famWork: [null, Validators.required],
      famSector: [null, Validators.required],
      famHealth: [null, Validators.required],
    });
  }

  onSubmit() {
    const formData = this.combinedForm.value;
    const fileName = formData.name; 
    this.formDataService.saveFormData(formData, fileName);
  }

  
  onValidation(controlName: string): boolean {
    const control = this.combinedForm.get(controlName);
    const isValid = control?.touched && control?.invalid;
    return isValid ? isValid : false;
  }

  
  get isFormValid(): Boolean{
    return this.combinedForm.valid;
  }

  get phoneNum() {
    return this.combinedForm.get('phoneNum');
  }

  get isPhoneNumValid() {
    return this.phoneNum?.valid;
  }

  get isInputsValid(){
    return !this.isFormValid;
  }
}
