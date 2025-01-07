'use client';

import { StepProps } from '@/interfaces';
import React from 'react';
import styles from './StepThree.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { IoPersonAddOutline } from 'react-icons/io5';

export const StepThree = ({ validate }: StepProps) => {
  const handleValidation = () => {
    // Perform validation logic here

    const isValid = true; // Replace with actual validation logic

    validate(isValid);
  };

  return (
    <section className={styles.stepContainer}>
      <form className={styles.stepFormContainer}>
        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Registra a tus acompañantes
          </legend>

          <p className={styles.stepDescription}>
            Debes registrar a todas las personas que te acompañen a esta gran
            aventura
          </p>

          <div className={styles.stepAgeRange}>
            <div>
              <input type='radio' id='adult' value='adult' />
              <label htmlFor='adult'>Adulto mayor de 18 años</label>
            </div>

            <div>
              <input type='radio' id='teen' value='teen' />
              <label htmlFor='teen'>Niño entre 18 y 14 años</label>
            </div>

            <div>
              <input type='radio' id='child' value='child' />
              <label htmlFor='child'>Niño menor de 14 años</label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Informacion personal del viajero
          </legend>

          <p className={styles.stepDescription}>
            Debes ingresar la informacion personal que se te solicita de tu
            acompañante
          </p>

          <div className={styles.stepFormInputs}>
            <div>
              <label htmlFor='firstName'>Nombres</label>
              <input
                id='firstName'
                type='text'
                placeholder='Escribe tus nombres'
              />
            </div>

            <div>
              <label htmlFor='lastName'>Apellidos</label>
              <input
                id='lastName'
                type='text'
                placeholder='Escribe tus apellidos'
              />
            </div>

            <div>
              <label htmlFor='documentType'>Tipo de documento</label>
              <select id='documentType'>
                <option value=''>Selecciona una opción</option>
                <option value='DNI'>DNI</option>
                <option value='PASSPORT'>Pasaporte</option>
                <option value='TIE'>TIE</option>
              </select>
            </div>

            <div>
              <label htmlFor='documentNumber'>Numero de documento</label>
              <input
                id='documentNumber'
                type='text'
                placeholder='Escribe el numero de documento'
              />
            </div>

            <div>
              <label htmlFor='documentSupport'>
                Número de soporte del documento (solo para DNI español)
              </label>
              <input
                id='documentSupport'
                type='text'
                placeholder='Número de soporte del documento'
              />
            </div>

            <div>
              <label htmlFor='birthDate'>Fecha de nacimiento</label>
              <input
                id='birthDate'
                type='date'
                placeholder='Fecha de nacimiento'
              />
            </div>

            <div>
              <label htmlFor='email'>Correo Electronico o Telefono</label>
              <input
                id='email'
                type='text'
                placeholder='Escribe tu correo electronico o telefono'
              />
            </div>

            <div>
              <label htmlFor='kinship'>Parentesco</label>
              <input id='kinship' type='text' placeholder='Parentesco' />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Direccion de procedencia del viajero
          </legend>

          <p className={styles.stepDescription}>
            Debes ingresar la direccion de donde procede el viajero
          </p>

          <div className={styles.stepFormInputs}>
            <div>
              <label htmlFor='address'>Dirección</label>
              <input
                id='address'
                type='text'
                placeholder='Escribe tu dirección'
              />
            </div>

            <div>
              <label htmlFor='city'>Código de Municipio</label>
              <input
                id='city'
                type='text'
                placeholder='Escribe tu código de municipio'
              />
            </div>

            <div>
              <label htmlFor='city'>Municipio</label>
              <input id='city' type='text' placeholder='Escribe tu Municipio' />
            </div>

            <div>
              <label htmlFor='postalCode'>Código Postal</label>
              <input
                id='postalCode'
                type='text'
                placeholder='Escribe tu código Postal'
              />
            </div>

            <div>
              <label htmlFor='countrySelect'>País</label>
              <select id='countrySelect'>
                <option value=''>Selecciona tu País</option>
                <option value='Spain'>España</option>
                <option value='France'>Francia</option>
                <option value='Italy'>Italia</option>
                <option value='Germany'>Alemania</option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>

      <h2 className={styles.stepTitle}>Viajeros registrados</h2>

      <p className={styles.stepDescription}>
        Listado de todos los viajeros registrados
      </p>

      <div className={styles.stepUsersContainer}>
        <div className={styles.stepUserRegister}>
          <div>
            <i className={styles.iconAddPerson}>
              <IoPersonAddOutline />
            </i>

            <p className={styles.userName}>Vic Flores</p>
          </div>

          <div>
            <button className={styles.iconButton}>
              <RiDeleteBinLine />
            </button>

            <button className={styles.iconButton}>
              <GrEdit />
            </button>
          </div>
        </div>
      </div>

      <button onClick={handleValidation} className={styles.registerButton}>
        Registrar nuevo acompañante
      </button>

      <button onClick={handleValidation} className={styles.nextStepButton}>
        Siguiente paso
      </button>
    </section>
  );
};
