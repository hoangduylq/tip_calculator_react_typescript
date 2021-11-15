import React, { createContext, useState } from 'react';
import { IGlobalState } from './utils/TypeScript';

interface IProps {
  children: React.ReactNode;
};

export const GlobalState = createContext({});

export const DataProvider = ({ children }: IProps): JSX.Element => {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState('');
  const [people, setPeople] = useState('');
  const [inputTip, setInputTip] = useState('');
  const [isValidBill, setIsValidBill] = useState(false);
  const [isValidPeople, setIsValidPeople] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(true);

  const state: IGlobalState = {
    bill: [bill, setBill],
    tip: [tip, setTip],
    people: [people, setPeople],
    inputTip: [inputTip, setInputTip],
    isValidBill: [isValidBill, setIsValidBill],
    isValidPeople: [isValidPeople, setIsValidPeople],
    isShowBtn: [isShowBtn, setIsShowBtn],
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
