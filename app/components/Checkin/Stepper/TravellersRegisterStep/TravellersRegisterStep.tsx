'use client';

import { StepProps } from '@/interfaces';
import React, { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import styles from './TravellersRegisterStep.module.css';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useTravellersRegister } from '@/hooks/useTravellersRegister';
import { ModalAlert } from '@/app/components/shared';
import { useCountries } from '@/hooks/useCountries';

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
    countries,
    loading: countriesLoading,
    error: countriesError,
  } = useCountries();

  const {
    errorMessage,
    travellersByGuest,
    reservationInfo,
    addTraveller,
    handleAddTraveller,
    handleRemoveTraveller,
    deleteTraveller,
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
            <button
              className={styles.iconButton}
              onClick={() => deleteTraveller(traveller.traveller_id)}
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </div>
      ))
    ) : (
      <div />
    );
  }, [travellersByGuest, deleteTraveller]);

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

      <div className={styles.userToRegister}>
        <h2 className={styles.stepLegendTitle}>
          Cantidad de huespedes a registrar:{' '}
          {reservationInfo.number_travellers_register}
        </h2>

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
        {travellersByGuest.length > 0 ? (
          <h2>Viajeros registrados</h2>
        ) : (
          <h2>No hay viajeros registrados</h2>
        )}

        {renderTravellers}
      </div>

      <form
        className={styles.stepFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset>
          <legend className={styles.stepLegendTitle}>
            Registro de huespedes
          </legend>

          <p className={styles.stepDescription}>
            Completa los siguientes campos con la informacion de los viajeros
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
                    ageRange === 'child'
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
                <option value='OTHER'>Otro</option>
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
                  minLength: {
                    value: 5,
                    message:
                      'El numero de documento debe tener al menos 3 caracteres',
                  },
                  maxLength: {
                    value: 18,
                    message:
                      'El numero de documento no puede tener mas de 18 caracteres',
                  },
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
                {...register('documentSupport', {
                  minLength: {
                    value: 5,
                    message:
                      'El número de soporte debe tener al menos 5 caracteres',
                  },
                  maxLength: {
                    value: 18,
                    message:
                      'El número de soporte no puede tener más de 18 caracteres',
                  },
                })}
                disabled={ageRange === 'child'}
                className={ageRange === 'child' ? styles.disabled : ''}
              />
              {errors.documentSupport && (
                <p className={styles.error}>{errors.documentSupport.message}</p>
              )}
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
              <select
                id='kinship'
                {...register('kinship', {
                  required:
                    ageRange === 'adult' ? false : 'Parentesco es requerido',
                })}
                disabled={ageRange === 'adult'}
                className={ageRange === 'adult' ? styles.disabled : ''}
              >
                <option value=''>Seleccionar parentesco</option>
                <option value='Padre'>Padre</option>
                <option value='Madre'>Madre</option>
                <option value='Hijo'>Hijo</option>
                <option value='Hija'>Hija</option>
                <option value='Hermano'>Hermano</option>
                <option value='Hermana'>Hermana</option>
                <option value='Abuelo'>Abuelo</option>
                <option value='Abuela'>Abuela</option>
                <option value='Tío'>Tío</option>
                <option value='Tía'>Tía</option>
                <option value='Primo'>Primo</option>
                <option value='Prima'>Prima</option>
                <option value='Sobrino'>Sobrino</option>
                <option value='Sobrina'>Sobrina</option>
                <option value='Cónyuge'>Cónyuge</option>
                <option value='Suegro'>Suegro</option>
                <option value='Suegra'>Suegra</option>
                <option value='Cuñado'>Cuñado</option>
                <option value='Cuñada'>Cuñada</option>
                <option value='Tutor Legal'>Tutor Legal</option>
                <option value='Otro'>Otro</option>
              </select>
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
                {...register('address', {
                  required: 'Dirección es requerido',
                  minLength: {
                    value: 5,
                    message: 'La dirección debe tener al menos 5 caracteres',
                  },
                  maxLength: {
                    value: 200,
                    message:
                      'La dirección no puede tener más de 200 caracteres',
                  },
                })}
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
                  minLength: {
                    value: 3,
                    message:
                      'El código de municipio debe tener al menos 3 caracteres',
                  },
                  maxLength: {
                    value: 8,
                    message:
                      'El código de municipio no puede tener más de 8 caracteres',
                  },
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
                {...register('city', {
                  required: 'Municipio es requerido',
                  minLength: {
                    value: 4,
                    message: 'El municipio debe tener al menos 4 caracteres',
                  },
                  maxLength: {
                    value: 50,
                    message: 'El municipio no puede tener más de 50 caracteres',
                  },
                })}
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
                  minLength: {
                    value: 3,
                    message:
                      'El código postal debe tener al menos 3 caracteres',
                  },
                  maxLength: {
                    value: 8,
                    message:
                      'El código postal no puede tener más de 8 caracteres',
                  },
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
                disabled={countriesLoading}
                className={countriesLoading ? styles.disabled : ''}
              >
                <option value=''>Selecciona tu País</option>
                {countriesError ? (
                  <option value='' disabled>
                    Error cargando países
                  </option>
                ) : countriesLoading ? (
                  <option value='' disabled>
                    Cargando países...
                  </option>
                ) : (
                  countries.map((country) => {
                    const countryName =
                      country.translations?.spa?.common || country.name.common;
                    return (
                      <option key={country.cca2} value={countryName}>
                        {countryName}
                      </option>
                    );
                  })
                )}
              </select>
              {countriesError && !errors.country && (
                <p className={styles.error}>{countriesError}</p>
              )}
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
        disabled={
          travellersByGuest.length < reservationInfo.number_travellers_register
        }
      >
        Siguiente paso
      </button>
    </section>
  );
};
