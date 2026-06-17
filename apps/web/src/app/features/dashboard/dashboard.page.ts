import { Component } from '@angular/core';

@Component({
  selector: 'cn-dashboard-page',
  template: `
    <main class="dashboard-shell">
      <section>
        <p class="eyebrow">CliniNote MVP</p>
        <h1>Borradores clinicos editables para psicologos</h1>
        <p>
          Estructura base lista para login, pacientes, sesiones, notas clinicas,
          aprobacion, exportacion PDF y auditoria.
        </p>
      </section>
    </main>
  `,
  styles: [
    `
      .dashboard-shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 32px;
      }

      section {
        width: min(720px, 100%);
      }

      .eyebrow {
        margin: 0 0 12px;
        color: #2f6f62;
        font-weight: 700;
      }

      h1 {
        margin: 0 0 16px;
        font-size: 40px;
        line-height: 1.1;
      }

      p {
        font-size: 18px;
        line-height: 1.6;
      }
    `
  ]
})
export class DashboardPage {}
