import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
  return (
    <div>

      {/* Contenu du corps de la page */}
      <main className={styles['main']}>
        <h1 className={styles['error-text']}>404</h1>
        <p className={styles['txt']}>Oups! La page que vous demandez n'existe pas.</p> 
        <p className={styles['lien']}>
          <Link to="/" className={styles['return-link']}>Retourner sur la page d'accueil</Link>
        </p>
     
      </main>

    </div>
  );
}
