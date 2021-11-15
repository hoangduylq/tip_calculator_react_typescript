import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import Dollar from '../Main/icons/icon-dollar.svg';
import Person from '../Main/icons/icon-person.svg';

const valueTipBtns = ['5', '10', '15', '25', '50'];

function CalInput() {
  const state: any = useContext(GlobalState);

  const [bill, setBill] = state.bill;
  const [tip, setTip] = state.tip;
  const [people, setPeople] = state.people;

  const [inputTip, setInputTip] = state.inputTip;

  const [isValidBill, setIsValidBill] = state.isValidBill;
  const [isValidPeople, setIsValidPeople] = state.isValidPeople;
  const [isShowBtn, setIsShowBtn] = state.isShowBtn;

  const handleBtnTip = (tip: string) => {
    setTip(tip);
  };

  const handleCustomTipBtn = () => {
    setIsShowBtn(false);
  };

  const handleChangeInput = (e: any, selector: any, validSelector: any) => {
    console.log(e)
    if (e.target.value.length > 9) {
      e.target.value = e.target.value.slice(0, 9);
    }
    e.target.value = e.target.value.replace(
      /[a-zA-Z&/ \\#,+()$~%'`!@^_=":*?<>{}-]/g,
      ''
    );
    selector(e.target.value);
    validSelector(false);
  };

  const handleChangeInputTip = (e: any) => {
    if (e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4);
    }
    e.target.value = e.target.value.replace(
      /[a-zA-Z&/ \\#,+()$~%'`!@^_=":*?<>{}-]/g,
      ''
    );
    setInputTip(e.target.value);
  };

  const handleOnBlurInputBill = () => {
    if (bill <= 0 || !bill) {
      setIsValidBill(true);
    }
  };

  const handleOnBlurInputTip = () => {
    setTip(inputTip);
  };

  const handleOnBlurInputPeople = () => {
    if (people <= 0 || !people || people.includes('.')) {
      setIsValidPeople(true);
    }
  };

  return (
    <section className='calculator__input'>
      <div className={`calculator__input__bill ${isValidBill && 'invalid'}`}>
        <div>
          <label htmlFor='bill'>Bill</label>
          <span className='invalid-noti'>Invalid value</span>
        </div>
        <div className='calculator__input__bill-wrap'>
          <img src={Dollar} alt='' />
          <input
            type='text'
            id='bill'
            placeholder='0'
            autoComplete='off'
            value={bill >= 0 ? bill : ''}
            name='bill'
            onBlur={handleOnBlurInputBill}
            onChange={(e) => handleChangeInput(e, setBill, setIsValidBill)}
          />
        </div>
      </div>

      <div className='calculator__input__tip'>
        <h5>Select Tip %</h5>
        <div className='calculator__input__tip__list'>
          {valueTipBtns.map((tipValue, index) => (
            <button
              key={index}
              className={`button-tip ${tipValue === tip && 'active'}`}
              data-index={tipValue}
              onClick={() => handleBtnTip(tipValue)}>
              {tipValue}%
            </button>
          ))}
          <button
            className={'button-tip' + (isShowBtn ? ' show' : ' hide')}
            id='tip-custom'
            onClick={handleCustomTipBtn}>
            Custom
          </button>
          <input
            type='text'
            id='tip-custom-input'
            className={!isShowBtn ? 'show' : 'hide'}
            placeholder='0'
            autoComplete='off'
            value={inputTip >= 0 ? inputTip : ''}
            onBlur={handleOnBlurInputTip}
            onChange={(e) => handleChangeInputTip(e)}
          />
        </div>
      </div>

      <div
        className={`calculator__input__people ${isValidPeople && 'invalid'}`}>
        <div>
          <label htmlFor='people'>Number of People</label>
          <span className='invalid-noti'>Invalid value</span>
        </div>
        <div className='calculator__input__people-wrap'>
          <img src={Person} alt='' />
          <input
            type='text'
            id='people'
            placeholder='0'
            autoComplete='off'
            name='people'
            value={people >= 0 ? people : ''}
            onBlur={handleOnBlurInputPeople}
            onChange={(e) => handleChangeInput(e, setPeople, setIsValidPeople)}
          />
        </div>
      </div>
    </section>
  );
}

export default CalInput;
