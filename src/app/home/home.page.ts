import { AfterViewInit, Component, OnInit, computed, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage implements OnInit {
  myAccel = signal(0);

  constructor() {
    this.basic();
  }

  x = signal(0);
  rolling = signal(false);

  cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  faces: Record<number, number[]> =
    {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };
  pips = computed(() => this.faces[this.x()] ?? []);

  test() {
    if (this.rolling()) return;
    this.x.set(Math.floor(Math.random() * 6) + 1);
    this.rolling.set(true);
  }

  async basic() {
    const accel = await Motion.addListener('accel', (event) => {
      this.myAccel.set(event.acceleration.x ?? 0)

      if (this.myAccel() > 5) {
        this.test();
      }


    });

  }

  ngOnInit() {

  }
}
