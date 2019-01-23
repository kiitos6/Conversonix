import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogActions} from '../conversor-list.component';

// export interface DialogReturnType {
//   action: string;
//   value: string;
// }

export interface DialogData {
  action: string;
  value: string;
  currencyValue: string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    changeBase(): void {
      this.data.action = DialogActions.Change_base;
      this.dialogRef.close(this.data);
    }

    addFavorites(): void {
      this.data.action = DialogActions.Add_favorite;
      this.dialogRef.close(this.data);
    }

    removeFavorites(): void {
      this.data.action = DialogActions.Remove_favorite;
      this.dialogRef.close(this.data);
    }


  ngOnInit() {
  }

}
