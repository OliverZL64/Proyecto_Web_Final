import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../services/articulos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  stats = {
    enviados: 0,
    revision: 0,
    aprobados: 0
  };

  constructor(private articulosService: ArticulosService) {}

  ngOnInit() {
    this.stats = this.articulosService.contarPorEstado();
  }
}
