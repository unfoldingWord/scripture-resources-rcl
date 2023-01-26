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
  verseObjectsMap,
}) {

  // const verseObjects = (verseObjectsMap && verseObjectsMap.length > 1) ? verseObjectsMap[1] : (verseObjectsMap && verseObjectsMap.length > 0) ? verseObjectsMap[0] : []
  
  
  useEffect(() => {
    const _selectionsMap = new Map()
    verseObjectsMap.forEach((verseObjectsArray, ref) => {
      const verseObjects = verseObjectsArray.flat(1);
      const selectionsFromQuotes = helpers.selectionsFromQuote({
        quote,
        verseObjects,
        occurrence: -1,
      })
      _selectionsMap.set(ref, selectionsFromQuotes);
    });
    // verseObjectsMap.forEach((verseObjects) => {
    //   _selectionsArray.push(helpers.selectionsFromQuote({
    //     quote,
    //     verseObjects,
    //     occurrence: -1,
    //   }));
    // }); 
    let _selections = new Map();
    // let i = 1;
    // const occurences = _selectionsArray.flat(1).length
    if (currentOccurrenceValue === -1) {
      // _selectionsArray.flat(1).forEach((selection) => _selections.push([selection])) 
      _selections = _selectionsMap;
    }else{
      // _selectionsArray.flat(1).forEach((selection) => _selections.push([selection])) 
      // _selections = _selections.slice(currentOccurrenceValue-1,currentOccurrenceValue)
      _selections = new Map();
      let occurrences = 0;
      _selectionsMap.forEach((verseObjectsArray, ref) => {
        const selections = verseObjectsArray.filter(() => {
          occurrences++
          return occurrences === currentOccurrenceValue;
        })
        _selections.set(ref, selections);
      })
    }
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
  }, [quote, currentOccurrenceValue, verseObjectsMap]);

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
  // }, [quote, occurrence, verseObjectsMap]);

  useEffect(() => {
    if (verseObjectsMap && onQuote) {
      const _quote = helpers.quoteFromVerse({selections, verseObjects});
      console.log("_quote",_quote)

      onQuote(_quote);
    }
  }, [selections, onQuote, verseObjectsMap]);

  const update = useCallback((_selections) => {
    // the "parsify" function is expecting an array of stringified objects
    // it will return an array of the parsed objects
    // const parsify = (array) => array.map(string => JSON.parse(string));
    // However, at present, some of the array elements are objecs, 
    // not strings. This causes the parse to fail. At present, it is
    // unknown where the mixed bag of an array is created.
    // So let's deal with it here.
    let _selectionsParsified = new Map();
    _selections.forEach((verseObjectsArray, ref) => {
      const _verseObjectsArray = []
      for (let i=0; i < verseObjectsArray.length; i++) {
        try {
          let x = JSON.parse(verseObjectsArray[i]);
          _verseObjectsArray.push(x);
        } catch (error) {
          _verseObjectsArray.push(verseObjectsArray[i]);
        }
      }
      _selectionsParsified.set(ref, _verseObjectsArray)
    })
    //const __selections = _selections && deepFreeze(parsify(_selections));
    const __selections = _selections && deepFreeze(_selectionsParsified);
    onSelections(__selections);
  }, [onSelections]);

  const isSelected = (word) => helpers.isSelected({word, selections});

  const areSelected = (words, ref) => helpers.areSelected({words, selections, ref});

  const addSelection = (word) => {
    let _selections = helpers.addSelection({word, selections});
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
  /** indicate single verse in verseObjectsMap (or else multiple verses) **/
  hasSingleVerse: PropTypes.bool,
  /** all verses where quote may be found */
  verseObjectsMap: PropTypes.array,
  /** if quote occurs mulitple times, this is the occurence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default useSelections;
