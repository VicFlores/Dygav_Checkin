'use client';

import { StepProps } from '@/interfaces';
import React, { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import styles from './TravellersRegisterStep.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useTravellersRegister } from '@/hooks/useTravellersRegister';
import { ModalAlert } from '@/app/components/shared';

interface FormData {
  ageRange: string;
  firstName: string;
  lastName: string;
  documentType: string | null;
  documentNumber: string | null;
  documentSupport?: string | null;
  birthDate: string;
  email: string;
  phone: string;
  kinship: string | null;
  address: string;
  cityCode: string;
  city: string;
  postalCode: string;
  country: string;
}

export const TravellersRegisterStep = ({ validate }: StepProps) => {
  const [showModal, setShowModal] = useState(true);

  const {
    errorMessage,
    travellersByGuest,
    reservationInfo,
    addTraveller,
    handleAddTraveller,
    handleRemoveTraveller,
  } = useTravellersRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();

  const ageRange = watch('ageRange');
  const documentType = watch('documentType');

  const onSubmit = async (data: FormData) => {
    await addTraveller(data);
    reset();
  };

  const handleValidation = useCallback(() => {
    if (
      travellersByGuest.length >= reservationInfo.number_travellers_register
    ) {
      validate(true);
    } else {
      validate(false);
    }
  }, [travellersByGuest, reservationInfo.number_travellers_register, validate]);

  const renderTravellers = useMemo(() => {
    return travellersByGuest.length > 0 ? (
      travellersByGuest.map((traveller) => (
        <div key={traveller.traveller_id} className={styles.stepUserRegister}>
          <div>
            <i className={styles.iconAddPerson}>
              <IoPersonAddOutline />
            </i>
            <p className={styles.userName}>
              {traveller.names} {traveller.lastnames}
            </p>
          </div>
          <div>
            <button className={styles.iconButton}>
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className={styles.stepUserRegister}>
        <div>
          <i className={styles.iconAddPerson}>
            <IoPersonAddOutline />
          </i>
          <p className={styles.userName}>No hay viajeros registrados</p>
        </div>
      </div>
    );
  }, [travellersByGuest]);

  const handleAcceptModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.stepContainer}>
      {showModal && (
        <ModalAlert
          message='Recuerda: Si algun huesped ya no pudo acompañarte, debes eliminarlo del conteo de huespedes a registrar'
          onAccept={handleAcceptModal}
        />
      )}

      <form
        className={styles.stepFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Registro de huespedes
          </legend>

          <p className={styles.stepDescription}>
            Debes registrarte a ti mismo y a tus acompañantes para poder
            disfrutar de esta gran aventura
          </p>

          <div className={styles.stepAgeRange}>
            <div>
              <input
                type='radio'
                id='adult'
                value='adult'
                {...register('ageRange', { required: 'Selecciona una opción' })}
              />
              <label htmlFor='adult'>Adulto mayor de 18 años</label>
            </div>

            <div>
              <input
                type='radio'
                id='teen'
                value='teen'
                {...register('ageRange', { required: 'Selecciona una opción' })}
              />
              <label htmlFor='teen'>Niño entre 18 y 14 años</label>
            </div>

            <div>
              <input
                type='radio'
                id='child'
                value='child'
                {...register('ageRange', { required: 'Selecciona una opción' })}
              />
              <label htmlFor='child'>Niño menor de 14 años</label>
            </div>
          </div>
          {errors.ageRange && (
            <p className={styles.error}>{errors.ageRange.message}</p>
          )}
        </fieldset>

        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Informacion personal del viajero
          </legend>

          <p className={styles.stepDescription}>
            Debes ingresar la informacion personal que se te solicita
          </p>

          <div className={styles.stepFormInputs}>
            <div>
              <label htmlFor='firstName'>Nombres</label>
              <input
                id='firstName'
                type='text'
                placeholder='Escribe tus nombres'
                {...register('firstName', { required: 'Nombres es requerido' })}
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='lastName'>Apellidos</label>
              <input
                id='lastName'
                type='text'
                placeholder='Escribe tus apellidos'
                {...register('lastName', {
                  required: 'Apellidos es requerido',
                })}
              />
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='documentType'>Tipo de documento</label>
              <select
                id='documentType'
                {...register('documentType', {
                  required:
                    ageRange === 'CHILD'
                      ? false
                      : 'Tipo de documento es requerido',
                })}
                disabled={ageRange === 'child'}
                className={ageRange === 'child' ? styles.disabled : ''}
              >
                <option value=''>Selecciona una opción</option>
                <option value='DNI'>DNI</option>
                <option value='PASSPORT'>Pasaporte</option>
                <option value='TIE'>TIE</option>
              </select>
              {errors.documentType && (
                <p className={styles.error}>{errors.documentType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='documentNumber'>Numero de documento</label>
              <input
                id='documentNumber'
                type='text'
                placeholder='Escribe el numero de documento'
                {...register('documentNumber', {
                  required:
                    ageRange === 'child'
                      ? false
                      : 'Numero de documento es requerido',
                  pattern:
                    documentType === 'DNI'
                      ? {
                          value: /^[0-9]{8}[A-Z]$/,
                          message: 'Formato de DNI no valido',
                        }
                      : undefined,
                })}
                disabled={ageRange === 'child'}
                className={ageRange === 'child' ? styles.disabled : ''}
              />
              {errors.documentNumber && (
                <p className={styles.error}>{errors.documentNumber.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='documentSupport'>
                Número de soporte del documento (solo para DNI español)
              </label>
              <input
                id='documentSupport'
                type='text'
                placeholder='Número de soporte del documento'
                {...register('documentSupport')}
                disabled={ageRange === 'child'}
                className={ageRange === 'child' ? styles.disabled : ''}
              />
            </div>

            <div>
              <label htmlFor='birthDate'>Fecha de nacimiento</label>
              <input
                id='birthDate'
                type='date'
                placeholder='Fecha de nacimiento'
                {...register('birthDate', {
                  required: 'Fecha de nacimiento es requerido',
                })}
              />
              {errors.birthDate && (
                <p className={styles.error}>{errors.birthDate.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='email'>Correo Electronico</label>
              <input
                id='email'
                type='email'
                placeholder='Escribe tu correo electronico'
                {...register('email', {
                  required: 'Correo Electronico es requerido',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Formato de correo electronico no valido',
                  },
                })}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='phone'>Telefono</label>
              <input
                id='phone'
                type='text'
                placeholder='Escribe tu telefono'
                {...register('phone', {
                  required: 'Telefono es requerido',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Solo se permiten números',
                  },
                })}
              />
              {errors.phone && (
                <p className={styles.error}>{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='kinship'>Parentesco</label>
              <input
                id='kinship'
                type='text'
                placeholder='Parentesco'
                {...register('kinship', {
                  required:
                    ageRange === 'adult' ? false : 'Parentesco es requerido',
                })}
                disabled={ageRange === 'adult'}
                className={ageRange === 'adult' ? styles.disabled : ''}
              />
              {errors.kinship && (
                <p className={styles.error}>{errors.kinship.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Direccion de procedencia del viajero
          </legend>

          <p className={styles.stepDescription}>
            Debes ingresar la dirección de procedencia del huesped
          </p>

          <div className={styles.stepFormInputs}>
            <div>
              <label htmlFor='address'>Dirección</label>
              <input
                id='address'
                type='text'
                placeholder='Escribe tu dirección'
                {...register('address', { required: 'Dirección es requerido' })}
              />
              {errors.address && (
                <p className={styles.error}>{errors.address.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='city'>Código de Municipio</label>
              <input
                id='city'
                type='text'
                placeholder='Escribe tu código de municipio'
                {...register('cityCode', {
                  required: 'Código de Municipio es requerido',
                })}
              />
              {errors.cityCode && (
                <p className={styles.error}>{errors.cityCode.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='city'>Municipio</label>
              <input
                id='city'
                type='text'
                placeholder='Escribe tu Municipio'
                {...register('city', { required: 'Municipio es requerido' })}
              />
              {errors.city && (
                <p className={styles.error}>{errors.city.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='postalCode'>Código Postal</label>
              <input
                id='postalCode'
                type='text'
                placeholder='Escribe tu código Postal'
                {...register('postalCode', {
                  required: 'Código Postal es requerido',
                })}
              />
              {errors.postalCode && (
                <p className={styles.error}>{errors.postalCode.message}</p>
              )}
            </div>

            <div>
              <label htmlFor='countrySelect'>País</label>
              <select
                id='countrySelect'
                {...register('country', { required: 'País es requerido' })}
              >
                <option value=''>Selecciona tu País</option>
                <option value='Spain'>España</option>
                <option value='France'>Francia</option>
                <option value='Italy'>Italia</option>
                <option value='Germany'>Alemania</option>
              </select>
              {errors.country && (
                <p className={styles.error}>{errors.country.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        <div className={styles.centerButtonContainer}>
          <button
            type='submit'
            className={styles.registerButton}
            disabled={
              travellersByGuest.length >=
              reservationInfo.number_travellers_register
            }
          >
            Registrar nuevo acompañante
          </button>
        </div>
      </form>

      <button
        type='submit'
        onClick={handleValidation}
        className={styles.nextStepButton}
      >
        Siguiente paso
      </button>

      <h2 className={styles.stepTitle}>Viajeros registrados</h2>
      <p className={styles.stepDescription}>
        Listado de todos los viajeros registrados
      </p>

      <div className={styles.userToRegister}>
        <div>
          <p>
            Si algun huesped ya no pudo acompañarte, debes eliminarlo del conteo
            de huespedes a registrar
          </p>
          <button className={styles.iconButton} onClick={handleRemoveTraveller}>
            <RiDeleteBinLine />
          </button>
        </div>

        <div>
          <p>
            Si has eliminado a un huesped por error, puedes volver a agregarlo
            para el conteo de huespedes a registrar
          </p>
          <button className={styles.iconButton} onClick={handleAddTraveller}>
            <IoPersonAddOutline />
          </button>
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>

      <div className={styles.stepUsersContainer}>
        <h2>
          Cantidad de huespedes a registrar:{' '}
          {reservationInfo.number_travellers_register}
        </h2>

        {renderTravellers}
      </div>
    </section>
  );
};
