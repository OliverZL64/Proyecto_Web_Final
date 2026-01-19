import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})


export class LayoutComponent {

}
