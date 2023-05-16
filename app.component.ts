import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { signal } from '../signals/signal';
import { computed } from '../signals/computed';
import { effect } from '../signals/effect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //main value  

  eee: any = signal( {name:"efi", id: 9})

  oa: any = signal( [{name:"efi", id: 9}])

  count = signal(0);

  double = computed(() => this.count() * 2);

  countType = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));

  constructor() {
    //in effect we must have one of the parameteres of signal or computed in order of triggering the effect
    effect(() => {
      console.log('Count changed', this.count());
      console.log(this.count(), 'is', this.countType());
    });
    effect(() => {
      console.log(this.eee());
      console.log(this.oa());
    });
  }

  inc() {
    this.eee.update((e) => ({...e, id: this.calc()}))
    let x = this.oa()
    console.log(x);
    x[0].id = 888
    this.oa.update((o) => ([...x]))
  }

  calc(){
    this.count.update((c) => c + 1)
    return this.count()
  }

  reset() {
    this.count.set(0);
  }
}
