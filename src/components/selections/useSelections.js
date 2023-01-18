import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect  from 'use-deep-compare-effect';

import * as helpers from './helpers';

function useSelections({
  selections,
  onSelections,
  occurrence: currentOccurrenceValue ,
  quote,
  onQuote,
  hasSingleVerse,
  verseObjectsArray,
}) {

  // const verseObjects = (verseObjectsArray && verseObjectsArray.length > 1) ? verseObjectsArray[1] : (verseObjectsArray && verseObjectsArray.length > 0) ? verseObjectsArray[0] : []
  
  // console.log(verseObjects)

  useEffect(() => {
    console.log(quote)
    
    const _selectionsArray = [];
    verseObjectsArray.forEach(verseObjects => {
      _selectionsArray.push(helpers.selectionsFromQuote({
        quote,
        verseObjects,
        occurrence: -1,
      }));
    }); 
    let _selections =[];
    // let i = 1;
    // const occurences = _selectionsArray.flat(1).length
    if(currentOccurrenceValue === -1){
    _selectionsArray.flat(1).forEach((selection) => _selections.push([selection])) 
    }else{
      _selectionsArray.flat(1).forEach((selection) => _selections.push([selection])) 
      _selections = _selections.slice(currentOccurrenceValue-1,currentOccurrenceValue)
    }
    console.log(currentOccurrenceValue)
    // const testSelection = _selections.slice(0,1)
    // // console.log("hey hi", _selectionsArray);
    // // _selectionsArray.flat(1).forEach((selection) => {
    // //   console.log(occurrence);
    // //   if(currentOccurrenceValue === -1){
    // //     _selections.push([selection])
    // //   }
    // // }) 
    //   console.log("hey hi", _selections);
    // _selections.push(_selectionsArray[0][0])
    // _selectionsArray.flat(1).forEach((selection) => _selections.push({
    //   text:"καὶ",
    //   occurrence:i++,
    //   occurrences:5
    // }))  
  //   let updatedSelections = [];
  //   _selectionsArray?.flat(1).forEach((selection) => {
  //     let selectionObject = JSON.parse(selection)
  //     console.log(JSON.parse(selection))
  //     updatedSelections.push([JSON.stringify({
  //     text: selectionObject.text,
  //     occurrence:i++,
  //     occurrences:_selectionsArray.flat(1).length
  //   })])
  // }) 
    // console.log(updatedSelections)
    // console.log(testSelection) //make occurences: 8 and set counter for occurence like 1,2,3,4,5,6,7,8 (rewrite the object)
    update(_selections)
  }, [quote, currentOccurrenceValue, verseObjectsArray]);

  // useEffect(() => {
  //   console.log(quote)
    
  //   const _selections = helpers.selectionsFromQuote({
  //     quote,
  //     verseObjects,
  //     occurrence,
  //   });

  //   console.log(hasSingleVerse)
  //   console.log(_selections)
  //   update(_selections);
  // }, [quote, occurrence, verseObjectsArray]);

  useEffect(() => {
    console.log(verseObjectsArray)
    if (verseObjectsArray && onQuote) {
      const _quote = helpers.quoteFromVerse({selections, verseObjects});
      console.log("_quote",_quote)

      onQuote(_quote);
    }
  }, [selections, onQuote, verseObjectsArray]);

  const update = useCallback((_selections) => {
    // the "parsify" function is expecting an array of stringified objects
    // it will return an array of the parsed objects
    // const parsify = (array) => array.map(string => JSON.parse(string));
    // However, at present, some of the array elements are objecs, 
    // not strings. This causes the parse to fail. At present, it is
    // unknown where the mixed bag of an array is created.
    // So let's deal with it here.
    let _selectionsParsified = [];
    for (let i=0; i < _selections.length; i++) {
      try {
        let x = JSON.parse(_selections[i]);
        _selectionsParsified.push(x);
      } catch (error) {
        _selectionsParsified.push(_selections[i]);
      }

    }
    //const __selections = _selections && deepFreeze(parsify(_selections));
    const __selections = _selections && deepFreeze(_selectionsParsified);
    onSelections(__selections);
  }, [onSelections]);

  const isSelected = (word) => helpers.isSelected({word, selections});

  const areSelected = (words) => helpers.areSelected({words, selections});

  const addSelection = (word) => {
    let _selectileons = helpers.addSelection({word, selections});
    update(_selections);
  };

  const addSelections = (words) => {
    let _selections = helpers.addSelections({words, selections});
    update(_selections);
  };

  const removeSelection = (word) => {
    const _selections = helpers.removeSelection({word, selections});
    update(_selections);
  };

  const removeSelections = (words) => {
    let _selections = helpers.removeSelections({words, selections});
    update(_selections);
  };

  console.log(selections)
  return {
    state: selections,
    actions: {
      update,
      isSelected,
      areSelected,
      addSelection,
      addSelections,
      removeSelection,
      removeSelections,
    },
  };
};

useSelections.propTypes = {
  /** words in a selection */
  selections: PropTypes.array,
  /** action taken after a selection is made */
  onSelections: PropTypes.func.isRequired,
  /** the quote to be selected */
  quote: PropTypes.string.isRequired,
  /** indicate single verse in verseObjectsArray (or else multiple verses) **/
  hasSingleVerse: PropTypes.bool,
  /** all verses where quote may be found */
  verseObjectsArray: PropTypes.array,
  /** if quote occurs mulitple times, this is the occurence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default useSelections;
