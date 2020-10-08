import {useState} from "react";


const Input = (validationRules) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    let initialErrors = {...validationRules};
    for(var key in initialErrors){
        initialErrors[key] = false;
    }
    const [errors, setErrors] = useState(initialErrors);

    const validateOnChange = (e) => {
        let errs = {};
        if(Object.keys(validationRules).includes('required')){
            errs.required = e.target.value.length === 0 ? true : false;
        }
        if(Object.keys(validationRules).includes('minLength')){
            errs.minLength = e.target.value.length < validationRules.minLength ? true : false;
        }
        if(Object.keys(validationRules).includes('maxLength')){
            errs.maxLength = e.target.value.length > validationRules.maxLength ? true : false;
        }
        if(Object.keys(validationRules).includes('pattern')){            
            const re = new RegExp(validationRules.pattern);
            console.log(re.test(e.target.value));
            errs.pattern = !re.test(e.target.value);
        }
        setErrors(errs);
   }
    const validateOnBlur = (e) => {
        let errs = {};
        if(Object.keys(validationRules).includes('required')){
            errs.required = e.target.value.length === 0 ? true : false;
        }
        if(Object.keys(validationRules).includes('minLength')){
            errs.minLength = e.target.value.length < validationRules.minLength ? true : false;
        }
        if(Object.keys(validationRules).includes('maxLength')){
            errs.maxLength = e.target.value.length > validationRules.maxLength ? true : false;
        }
        setErrors(errs);
   }

    return {
      touched,
      errors,
      value,
      setValue,
      reset: () => {
          setValue('');
          setTouched(false);
      },
      bind: {
        value,
        onChange: e => {
          setValue(e.target.value);
          if(Object.keys(validationRules).length > 0){
              validateOnChange(e)
          }
        },
        onBlur: e => {
            setTouched(true);
            if(Object.keys(validationRules).length > 0){
                validateOnBlur(e)
            }
        }
      }
    };
  };

  export default Input;
