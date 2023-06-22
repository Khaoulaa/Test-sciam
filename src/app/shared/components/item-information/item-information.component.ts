import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-information',
  templateUrl: './item-information.component.html',
  styleUrls: ['./item-information.component.scss']
})
export class ItemInformationComponent implements OnInit {

  constructor() { }
  @Input() information: any;
  @Input() child: string;

  ngOnInit(): void {
  }

  

}
