import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pagina } from './pagina/pagina';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Pagina,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('routeProject');
}
