import React, { useContext, useRef, useState, useEffect } from 'react';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import { API_URL } from '../../utils/Config';

function CalResult() {
  const state: any = useContext(GlobalState);

  const [bill, setBill] = state.bill;
  const [tip, setTip] = state.tip;
  const [people, setPeople] = state.people;

  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const btnResetEl = useRef(null);
  const btnResultEl = useRef(null);

  const [isDisabled, setIsDisabled] = useState(true);
  const [, setIsValidBill] = state.isValidBill;
  const [, setIsValidPeople] = state.isValidPeople;
  const [, setInputTip] = state.inputTip;
  const [, setIsShowBtn] = state.isShowBtn;

  useEffect(() => {
    setIsDisabled(!(bill || tip || people));
  }, [bill, tip, people]);

  const handleResultBtn = async () => {
    if (bill <= 0 || !bill) {
      setIsValidBill(true);
    }

    if (people <= 0 || !people || people.includes('.')) {
      setIsValidPeople(true);
    }

    if (bill > 0 && people > 0 && !people.includes('.') && tip >= 0) {
      try {
        setIsDisabled(true);
        const res = await axios.get(
          `${API_URL}calculate?bill=${bill}&people=${people}&tipPercent=${tip}`
        );
        if (res.data.result) {
          setTotal(res.data.total);
          setAmount(res.data.amount);
          setIsDisabled(false);
        }
      } catch (error: any) {
        alert(error.message);
        setIsDisabled(false);
      }
    }
  };

  const handleResetBtn = () => {
    setBill('');
    setTip('');
    setPeople('');
    setInputTip('');
    setAmount(0);
    setTotal(0);
    setIsDisabled(true);
    setIsValidBill(false);
    setIsValidPeople(false);
    setIsShowBtn(true);
  };

  const formatedNumber = (num: number) => {
    let n = Number(num);
    const value = (Math.round(n * 100) / 100).toFixed(2);
    return value;
  };

  return (
    <section className='calculator__result'>
      <div className='calculator__result__tip-amount'>
        <div className='calculator__result__tip-amount__title'>
          <h4>Tip Amount</h4>
          <span>/ person</span>
        </div>
        <div className='amount-result'>
          <p>$</p>
          <span id='amount'>{formatedNumber(amount)}</span>
        </div>
      </div>
      <div className='calculator__result__tip-total'>
        <div className='calculator__result__tip-total__title'>
          <h4>Total</h4>
          <span>/ person</span>
        </div>
        <div className='total-result'>
          <p>$</p>
          <span id='total'>{formatedNumber(total)}</span>
        </div>
      </div>

      <div className='btn-wrap'>
        <button
          ref={btnResetEl}
          id='reset'
          className={isDisabled ? 'disabled-btn' : ''}
          disabled={isDisabled}
          onClick={handleResetBtn}>
          Reset
        </button>
        <button
          ref={btnResultEl}
          id='submit-btn'
          className={isDisabled ? 'disabled-btn' : ''}
          disabled={isDisabled}
          onClick={handleResultBtn}>
          Result
        </button>
      </div>
    </section>
  );
}

export default CalResult;
