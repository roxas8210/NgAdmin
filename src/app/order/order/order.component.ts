import { Component, OnInit, Inject } from '@angular/core';
import { Deepstream } from '../../deepstream.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor( @Inject('deepstream') private dp: Deepstream) { }

  ngOnInit() {
    // this.dp.
  }

}
