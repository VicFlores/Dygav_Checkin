import { StepProps } from '@/interfaces';
import React from 'react';
import styles from './StepThree.module.css';
import Image from 'next/image';
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
              <input type='checkbox' id='adult' name='ageRange' value='adult' />
              <label htmlFor='adult'>Adulto mayor de 18 años</label>
            </div>

            <div>
              <input type='checkbox' id='teen' name='ageRange' value='teen' />
              <label htmlFor='teen'>Niño entre 18 y 14 años</label>
            </div>

            <div>
              <input type='checkbox' id='child' name='ageRange' value='child' />
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
                <option value='CC'>Cédula de ciudadanía</option>
                <option value='CE'>Cédula de extranjería</option>
                <option value='PA'>Pasaporte</option>
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
                type='text'
                placeholder='Fecha de nacimiento'
              />
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
                <option value='ES'>España</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Contactos del viajero
          </legend>

          <p className={styles.stepDescription}>
            Debes ingresar los principales medios de contacto del viajero
          </p>

          <div className={styles.stepFormInputs}>
            <div>
              <label htmlFor='email'>Correo Electronico</label>
              <input
                id='email'
                type='text'
                placeholder='Escribe tu correo electronico'
              />
            </div>

            <div>
              <label htmlFor='phone'>Numero de telefono</label>
              <input
                id='phone'
                type='text'
                placeholder='Escribe tu numero de telefono'
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.stepLegendTitle}>Firma del viajero</legend>

          <p className={styles.stepDescription}>
            El viajero a ingresar debe de insertar su firma electronica
          </p>

          <div className={styles.stepCards}>
            <div className={styles.stepCard}>
              <figure className={styles.figureImage}>
                <Image
                  src='tempImages/Signing a contract-amico.svg'
                  alt='ID Card'
                  layout='fill'
                />
              </figure>

              <h3>Abrir lienzo para firma digital</h3>

              <p>
                Si tienes una pantalla tactil te recomendamos abrir un lienzo
                para que puedas hacer tu firma electronica.
              </p>

              <button>Abrir lienzo</button>
            </div>

            <div className={styles.stepCard}>
              <figure className={styles.figureImage}>
                <Image
                  src='tempImages/QR Code-amico.svg'
                  alt='ID Card'
                  layout='fill'
                />
              </figure>

              <h3>Generar codigo QR</h3>

              <p>
                Si no tienes una pantalla tactil genera un QR para que puedas
                escaearlo con tu dispositivo y haci poder hacer tu forma
                electronica.
              </p>

              <button>Generar codigo QR</button>
            </div>

            <div className={styles.stepCard}>
              <figure className={styles.figureImage}>
                <Image
                  src='tempImages/Share link-rafiki.svg'
                  alt='ID Card'
                  layout='fill'
                />
              </figure>

              <h3>Compartir link</h3>

              <p>
                Si el viajero que se ha registrado se encuentra en una ubicacion
                diferente genera un link y comparteselo para que pueda realizar
                su firma electronica
              </p>

              <button>Compartir link unico</button>
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

            <p className={styles.userName}>Vic Ferman Flores Escobar</p>
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

      <button className={styles.registerButton}>
        Registrar nuevo acompañante
      </button>

      <button onClick={handleValidation} className={styles.nextStepButton}>
        Siguiente paso
      </button>
    </section>
  );
};
