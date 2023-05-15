import successfulRegistrationIcon from '../images/successful-registration-icon.svg';
import failedRegistrationIcon from '../images/failed-registration-icon.svg';

const InfoTooltip = ({isOpen, onClose, isSuccessfully}) => {
  return (
    <div className={`popup ${isOpen? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick={onClose}
        />
        <img
          src={isSuccessfully ? successfulRegistrationIcon : failedRegistrationIcon}
          className='popup__registration-icon'
          alt={isSuccessfully ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так'}
        />
        <h2 className='popup__registration-title'>
          {isSuccessfully ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h2>
      </div>
    </div>
  );
};

export default InfoTooltip;