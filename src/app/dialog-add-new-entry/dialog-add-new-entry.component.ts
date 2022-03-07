import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-new-entry',
  templateUrl: './dialog-add-new-entry.component.html',
  styleUrls: ['./dialog-add-new-entry.component.scss']
})
export class DialogAddNewEntryComponent implements OnInit {

  contactForm !: FormGroup;
  actionBtn: string = "Save"
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    //@Inject pushes the data from the table to the form when we use the edit button 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogAddNewEntryComponent>) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required,],
      birthday: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      type: ['', Validators.required]
    });

    if(this.editData){
      //this.actionBtn changes the string value inside of the button to reflect it was used for editing, not adding.
      this.actionBtn = "Update";
      this.contactForm.controls['name'].setValue(this.editData.name);
      this.contactForm.controls['address'].setValue(this.editData.address);
      this.contactForm.controls['birthday'].setValue(this.editData.birthday);
      this.contactForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.contactForm.controls['email'].setValue(this.editData.email);
      this.contactForm.controls['type'].setValue(this.editData.type);
    }
  }

  //function for posting contact to JSON server
  addContact(){
    if(!this.editData){
      if(this.contactForm.valid){
        this.api.postContact(this.contactForm.value)
        .subscribe({
          next:(res) => {
            alert("Contact added successfully!");
            //close the form on submit button and reset it
            this.contactForm.reset();
            this.dialogRef.close('save');
          },
          error:() => {
            alert("Error in submitting, contact not added.")
          }
        })
      }
     } else {
        this.updateContact();
      }
  }
  updateContact(){
      this.api.putContact(this.contactForm.value, this.editData.id)
      .subscribe({
        next:(res) => {
          alert("Contact updated Successfully!");
          this.contactForm.reset();
          this.dialogRef.close('update');
        },
        error:() =>{
          alert("Error while updating, contact administrator.")
        }
      })
  }

}
