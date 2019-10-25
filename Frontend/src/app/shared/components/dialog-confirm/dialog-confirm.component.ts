import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDialogConfirm } from './dialog-confirm.interface';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogConfirm) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(){
    this.dialogRef.close(true);
  }

  ngOnInit(){

  }
}
