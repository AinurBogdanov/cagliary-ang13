import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { sauces } from 'src/app/core/data/backData/sauces-data';
import { Sauce } from 'src/app/core/data/interfaces/sauce';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  sauces: Sauce[] = sauces;
  selectedId: number = 8;
  @Output() closeModal = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onSelectSauce(id: number) {
    this.selectedId = id;
    console.log(this.selectedId);
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
