import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pairwise } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  regForm: FormGroup;
  showWarnings: boolean;
  errorMessages :any= [];
  constructor(private fb: FormBuilder) { }

  validationsObj:any = {
    firstName : {
      message: 'Please Enter First Name'
    },
    lastName : {
      message: 'Please Enter Last Name'
    },
    gender : {
      message: 'Please Select Gender'
    },
  }
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.regForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required]
    })

    if (this.regForm) {
      // For Individual Control Changes
      this.regForm.get('firstName')?.valueChanges.pipe(pairwise()).subscribe(([prev, next]) => {
        // console.log('PRev val', prev);
        // console.log('Next val', next);
        // if(prev !== next){
        //   // businees logic          
        // }

      })


      //FORM Changes
      this.regForm.valueChanges.pipe(pairwise()).subscribe(([prev, next]) => {
        this.errorMessages = [];
        console.log('Form PRev val', prev);
        console.log('Form Next val', next);
        if (prev !== next) {
          // businees logic          
        }

        
        let controls:any = Object.keys(this.regForm.controls) || []; // [firstName, lastName, gender, ....]
        controls.forEach((controlName:any) => {
            console.log("control", controlName)
            if(this.regForm.get(controlName)?.invalid){ // FirstName is Invalid // Last Name is empty
              this.errorMessages.push(this.validationsObj[controlName]?.message) // [Please Enter First Name , Plesae Enter Last Name,....]
            }
        });
        console.log('Form Validity', this.regForm.valid);

        if (this.regForm.invalid) { 
          this.showWarnings = true; 
        }
        else {
          this.showWarnings = false;
        }

      })

    }


  }

  registerForm() {
    if(this.regForm.invalid){
      this.showWarnings = true; 
    }

  }


}
