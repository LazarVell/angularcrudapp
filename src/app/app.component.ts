import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddNewEntryComponent } from './dialog-add-new-entry/dialog-add-new-entry.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularcrudapp';

  displayedColumns: string[] = ['name', 'address', 'birthday', 'phoneNumber', 'email', 'type', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  //OOP Interface concept, AppComponent must define ngOnInit as it implements OnInit interface.
  ngOnInit(): void {
    this.getAllContacts();
  }
  openDialog() {
    this.dialog.open(DialogAddNewEntryComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save'){
        this.getAllContacts();
      };
    });
  }

  showGitHub(){
    if (window.confirm('Click OK to go to my Github, or cancel to stay on this page. Thank you!')) 
{
window.location.href='https://github.com/LazarVell/';
};
  }

  getAllContacts(){
    this.api.getContact()
    .subscribe({
      next:(res) => {
        //this command pushes our response to the table
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => {
        alert("Error in fetching Contacts, please refresh...")
      }
    })
  }

  editContact(row: any){
    this.dialog.open(DialogAddNewEntryComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => { //afterClosed lets us define an action after our function closes, in this case we refresh the table.
      if(val === 'update'){
        this.getAllContacts();
      };
    });
  };

  deleteProduct(id : number){
    this.api.deleteContact(id)
    .subscribe({
      next:(res) => {
        alert("Contact Deleted.")
        this.getAllContacts();
      },
      error:() => {
        alert("ERR while deleting.")
      }
    })
  }

  //Material UI filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
