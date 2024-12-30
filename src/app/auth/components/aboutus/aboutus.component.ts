import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';

@Component({
  selector: 'app-aboutus',
  imports: [SharedModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AboutusComponent {

}
