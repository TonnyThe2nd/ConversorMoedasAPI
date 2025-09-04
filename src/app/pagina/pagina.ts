import { Component, ChangeDetectorRef } from '@angular/core';
import { ClimaService } from './clima-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { catchError, finalize, of } from 'rxjs';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule,
    // Angular Material modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './pagina.html',
  styleUrl: './pagina.css'
})
export class Pagina {
  
  de: string = '';
  para: string = '';
  valor: number = 0;
  resultado: number | null = null;
  loading: boolean = false;
  showResult: boolean = false; 

  constructor(
    private climaService: ClimaService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef 
  ) {}

  converterValor() {
    if (!this.de || !this.para || !this.valor) {
      this.snackBar.open('Preencha todos os campos!', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.loading = true;
    this.showResult = false;
    this.climaService.converter(this.de, this.para, this.valor)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        }),
        catchError((error) => {
          console.error('Erro na conversão:', error);
          this.snackBar.open('Erro ao converter moeda!', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          return of(null);
        })
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.resultado = res.convertedAmount ?? res.resulta;
            this.showResult = true; 
            this.cdr.detectChanges(); 
            this.snackBar.open('Conversão realizada com sucesso!', 'Fechar', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });

          }
        }
      });
  }
}