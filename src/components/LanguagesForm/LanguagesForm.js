import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './LanguagesForm.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function LanguagesForm() {
  const decodedToken = useSelector((state) => state.userStatus.decodedToken)

  let history = useHistory()
  const offeredLgs = useSelector(
    (state) => state.languagesReducer.userOfferedLgs,
  )
  console.log(offeredLgs)
  const wantedLgs = useSelector((state) => state.languagesReducer.userWantedLgs)

  const checkInput = { errors: { required: true } } // later from form's errors, if no checkbox was checked

  const dispatch = useDispatch()

  const { register, handleSubmit, errors, watch } = useForm()
  const [emptyOfferedLgsArr, setEmptyOfferedLgsArr] = useState(true)
  const [emptyWantedLgsArr, setEmptyWantedLgsArr] = useState(true)
  // const token = useSelector(state => state.userReducer.decodedToken);

  let offeredlgsArr = [
    { name: 'english', country: 'gb', selected: false },
    { name: 'french', country: 'fr', selected: false },
    { name: 'spanish', country: 'es', selected: false },
    { name: 'german', country: 'de', selected: false },
    { name: 'chinese', country: 'cn', selected: false },
    { name: 'russian', country: 'ru', selected: false },
    { name: 'italian', country: 'it', selected: false },
    { name: 'portuguese', country: 'pt', selected: false },
    { name: 'greek', country: 'gr', selected: false },
    { name: 'japanese', country: 'jp', selected: false },
    { name: 'dutch', country: 'nl', selected: false },
    { name: 'turkish', country: 'tr', selected: false },
  ]
  let wantedlgsArr = [
    { name: 'english', country: 'gb', selected: false },
    { name: 'french', country: 'fr', selected: false },
    { name: 'spanish', country: 'es', selected: false },
    { name: 'german', country: 'de', selected: false },
    { name: 'chinese', country: 'cn', selected: false },
    { name: 'russian', country: 'ru', selected: false },
    { name: 'italian', country: 'it', selected: false },
    { name: 'portuguese', country: 'pt', selected: false },
    { name: 'greek', country: 'gr', selected: false },
    { name: 'japanese', country: 'jp', selected: false },
    { name: 'dutch', country: 'nl', selected: false },
    { name: 'turkish', country: 'tr', selected: false },
  ]

  const [checkedOfferedLgs, setCheckedOfferedLgs] = useState([])
  const [checkedWantedLgs, setCheckedWantedLgs] = useState([])
  useEffect(() => {
    setCheckedOfferedLgs(setInitialOfferedLgsChecks())
  }, [])
  useEffect(() => {
    setCheckedWantedLgs(setInitialWantedLgsChecks())
  }, [])
  function setInitialOfferedLgsChecks() {
    let arr = []
    console.log(offeredLgs)
    if (offeredLgs?.length > 0) {
      for (const lg of offeredlgsArr) {
        for (const lgFromDB of offeredLgs) {
          if (lg.name === lgFromDB.name) {
            offeredlgsArr[offeredlgsArr.indexOf(lg)].selected = true
            arr.push(lg.name)
          }
        }
      }
    }
    if (arr.length > 0) {
      setEmptyOfferedLgsArr(false)
    }
    return arr
  }
  function setInitialWantedLgsChecks() {
    let arr = []
    console.log(wantedLgs)
    if (wantedLgs?.length > 0) {
      for (const lg of wantedlgsArr) {
        for (const lgFromDB of wantedLgs) {
          if (lg.name === lgFromDB.name) {
            wantedlgsArr[wantedlgsArr.indexOf(lg)].selected = true
            arr.push(lg.name)
          }
        }
      }
    }
    if (arr.length > 0) {
      setEmptyWantedLgsArr(false)
    }
    return arr
  }

  const submitForm = async () => {
    const requestOptionsOfferedLgs = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: decodedToken.id,
        offeredLgs: checkedOfferedLgs,
      }), //id: token.id
    }
    fetch(
      'http://localhost:4000/auth/adduserofferedlgs',
      requestOptionsOfferedLgs,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data)
          console.log(data.offerelgs)
          dispatch({ type: 'SET_USER_OFFEREDLGS', payload: data.offeredlgs })
          //history.push("/home");
          //dispatch({ type: "SET_USER_WANTEDLGS", payload: data.wantedLgs });
        }
      })
    const requestOptionsWantedLgs = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: decodedToken.id,
        wantedLgs: checkedWantedLgs,
      }), //id: token.id
    }
    fetch(
      'http://localhost:4000/auth/adduserwantedlgs',
      requestOptionsWantedLgs,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          dispatch({ type: 'SET_USER_WANTEDLGS', payload: data.wantedlgs })
          //history.push("/home");
          //dispatch({ type: "SET_USER_WANTEDLGS", payload: data.wantedLgs });
        }
      })
    history.push('/home')
  }
  const sortOfferedLgs = () => {
    const sortedOfferedLgs = offeredlgsArr.sort((a, b) =>
      a.name > b.name ? 1 : -1,
    )
    console.log(sortedOfferedLgs)
    return sortedOfferedLgs
  }
  const sortWantedLgs = () => {
    const sortedWantedLgs = wantedlgsArr.sort((a, b) =>
      a.name > b.name ? 1 : -1,
    )
    console.log(sortedWantedLgs)
    return sortedWantedLgs
  }

  const onOfferedLgsCheckboxChange = (e) => {
    console.log(e.target.checked)
    console.log(e.target.value)

    if (e.target.checked) {
      setCheckedOfferedLgs([...checkedOfferedLgs, e.target.value])
    } else {
      for (const lg of checkedOfferedLgs) {
        if (lg === e.target.value) {
          const checkedLgsCopy = [...checkedOfferedLgs]
          checkedLgsCopy.splice(checkedLgsCopy.indexOf(lg), 1)
          setCheckedOfferedLgs(checkedLgsCopy)
        }
      }
    }
  }
  const onWantedLgsCheckboxChange = (e) => {
    console.log(e.target.checked)
    console.log(e.target.value)

    if (e.target.checked) {
      setCheckedWantedLgs([...checkedWantedLgs, e.target.value])
    } else {
      for (const lg of checkedWantedLgs) {
        if (lg === e.target.value) {
          const checkedLgsCopy = [...checkedWantedLgs]
          checkedLgsCopy.splice(checkedLgsCopy.indexOf(lg), 1)
          setCheckedWantedLgs(checkedLgsCopy)
        }
      }
    }
  }

  return (
    <form className="lgs-form" onSubmit={handleSubmit(submitForm)}>
      <div className="boxes-container">
        <div className="boxes">
          <div className="box box-1">
            <div className="header centering-container">
              <p>I am a speaker of</p>
            </div>

            <div className="lgs-container">
              <ul className="popup-list">
                <div className="popup-col">
                  {sortOfferedLgs()
                    .slice(0, 6)
                    .map((lg, i) => {
                      return (
                        <li key={i} className="popup-item">
                          <input
                            type="checkbox"
                            id={lg.name}
                            className=""
                            value={lg.name}
                            onChange={onOfferedLgsCheckboxChange}
                            name={lg.name}
                            ref={register()}
                            checked={
                              lg.selected || checkedOfferedLgs.includes(lg.name)
                            }
                          />

                          <label className="popup-label" for={lg.name}>
                            <span
                              className={`flag-icon flag-icon-${lg.country}`}
                            ></span>
                            {lg.name}
                          </label>
                        </li>
                      )
                    })}
                </div>
                <div class="popup-col">
                  {sortOfferedLgs()
                    .slice(6, 12)
                    .map((lg, i) => {
                      return (
                        <li key={i} className="popup-item">
                          <input
                            type="checkbox"
                            id={lg.name}
                            className=""
                            value={lg.name}
                            onChange={onOfferedLgsCheckboxChange}
                            name={lg.name}
                            ref={register()}
                            checked={
                              lg.selected || checkedOfferedLgs.includes(lg.name)
                            }
                          />

                          <label className="popup-label" for={lg.name}>
                            <span
                              className={`flag-icon flag-icon-${lg.country}`}
                            ></span>
                            {lg.name}
                          </label>
                        </li>
                      )
                    })}
                </div>
              </ul>
            </div>
          </div>
          {/*
           ****************************************************
           */}
          <div className="box box-2">
            <div className="header centering-container">
              <p>I want to learn</p>
            </div>

            <div className="lgs-container">
              <ul className="popup-list">
                <div className="popup-col">
                  {sortWantedLgs()
                    .slice(0, 6)
                    .map((lg, i) => {
                      return (
                        <li key={i} className="popup-item">
                          <input
                            type="checkbox"
                            id={lg.name}
                            className=""
                            value={lg.name}
                            onChange={onWantedLgsCheckboxChange}
                            name={lg.name}
                            ref={register()}
                            checked={
                              lg.selected || checkedWantedLgs.includes(lg.name)
                            }
                          />

                          <label className="popup-label" for={lg.name}>
                            <span
                              className={`flag-icon flag-icon-${lg.country}`}
                            ></span>
                            {lg.name}
                          </label>
                        </li>
                      )
                    })}
                </div>
                <div class="popup-col">
                  {sortWantedLgs()
                    .slice(6, 12)
                    .map((lg, i) => {
                      return (
                        <li key={i} className="popup-item">
                          <input
                            type="checkbox"
                            id={lg.name}
                            className=""
                            value={lg.name}
                            onChange={onWantedLgsCheckboxChange}
                            name={lg.name}
                            ref={register()}
                            checked={
                              lg.selected || checkedWantedLgs.includes(lg.name)
                            }
                          />

                          <label className="popup-label" for={lg.name}>
                            <span
                              className={`flag-icon flag-icon-${lg.country}`}
                            ></span>
                            {lg.name}
                          </label>
                        </li>
                      )
                    })}
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`no-warning ${
            checkedOfferedLgs.length === 0 ||
            (checkedWantedLgs.length === 0 && 'warning')
          }`}
        >
          <p className="horizontal-center">
            At least one languages from each section must be selected!
          </p>
        </div>
      </div>

      <div className="languages-btn-container">
        <button
          type="submit"
          className={`btn-raise language-btn ${
            checkedOfferedLgs.length === 0 ||
            (checkedWantedLgs.length === 0 && 'language-btn-disabled')
          }`}
          disabled={
            checkedOfferedLgs.length === 0 || checkedWantedLgs.length === 0
          }
        >
          Submit
        </button>
      </div>
    </form>
  )
}

/*
<p>popup works!</p>
<div class='popup' *ngIf='offeredLgsMode || wantedLgsMode'>  
    <div class='centering-container'>
        <p class="popup-heading" [ngClass]="{'error-no-language-selected': !updateLgsForm.controls['checkArray'].errors?.required}">
            select <span class='or'>or</span>                                      
        </p>
        <button class='btn-link btn-cancelLgChange' (click)='setLanguagesChangeMode(false)'>Cancel</button>  
    </div>      
    
    
    <form className="form-container onSubmit={handleSubmit(submitForm)}">
                    
        <ul class='popup-list'>
            <div class='popup-col'>      
                <li *ngFor='let lg of getItemList() | slice:0:6' class='popup-item'>
                    <input type="checkbox" id='{{lg.name}}' 
                        [value]='lg.name' (change)="onCheckboxChange($event)" class="" [checked]='lg.selected'>
                    <label class='popup-label' for='{{lg.name}}'>
                        <span class="flag-icon flag-icon-{{lg.country}}"></span>{{lg.name}}
                    </label>
                </li> 
            </div>    
            <div class='popup-col'>      
                <li *ngFor='let lg of getItemList() | slice:6:12' class='popup-item'>
                    <input type="checkbox" id='{{lg.name}}' 
                        [value]='lg.name' (change)="onCheckboxChange($event)" class="" [checked]='lg.selected'>
                    <label class='popup-label' for='{{lg.name}}'>
                        <span class="flag-icon flag-icon-{{lg.country}}"></span>{{lg.name}}
                    </label>
                </li> 
            </div>                                 
        </ul>
    <div class='centering-container'>
        <button type='submit' class='btn-raise btn-lg-change-submit' [disabled]='!updateLgsForm.valid'>Submit</button>
    </div>                  
    </form>
<!--offeredLgsMode from db...with resolver to home and here via parent-child, 
    if offeredLgsMode -> sortedLgs is sortedOfferedLgs, in this js

    updateOfferedLgsForm replace with formName....depends on mode
-->         
<button (click)='showFormValue()'>Show Form  and data</button>
</div>  





*/
