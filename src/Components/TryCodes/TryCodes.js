// const renderResumePaper = () => {
//     return (
//         arrClassName.map(i => 
//             (<section key={i} className={`grid-area ${i}`}></section>)
//         )
//     );
// }

// const ResumeGrid = () => {
//     return (
//             <div className="wrapper">
//                 <div className="resume">
//                     {renderResumePaper()}
//                 </div>
//             </div>
//     )
// }

// const renderInputsValues = () => {
    //     return (
    //         arrState.map(i =>
    //             (<b key={i} className='headersSize'>{ourForm.objectName[i]}</b>)
    //         )
    //     );
    // }

    // const renderResumePaper = () => {
    //     return (
    //         arrClassName.map(i  => 
    //             ( 
    //                 <section 
    //                     key={i} 
    //                     className={`grid-area ${i}`}
    //                 > 
    //                 <h4>{arrClassName[0]}</h4> 
    //                 {renderInputsValues()} 
    //                 </section>
    //             )
    //         )
    //     );
    // }

    // const renderArticles = () => {
    //     return (
    //         resumeArticles.map(i =>
    //             (
    //                 <h4 key={i} className='articles'>{resumeArticles[1]}</h4>
    //             )
    //         )
    //     );
    // }

    /*
    unic types for inputs : age (number), email (email), 
    gpa (number), gender (option: male, female)
    */ 

    // const verifyParentheses = (text) => {
    //     const useArr = [];
    //     for (const check of text) {
    //         if (check === '(' ) useArr.unshift( ')' )
    //         else if (check === '[' ) useArr.unshift( ']' )
    //         else if (check === '<' ) useArr.unshift( '>' )
    //         else if (check === useArr[0] ) useArr.shift()
    //         else if (check === ')' || check === ']' || check === '>' ) return 0;
    //     }
    //     return 1;
    // }
    
    // ‘a’ and ‘b’ are single character strings
    // function func(s, a, b)
    // {
    //     var match_empty=/^$/ ;
    //     if (s.match(match_empty))
    //     {
    //         return -1;
    //     }
    //     else
    //     {
    //         var i=s.length-1;
    //         var aIndex=-1;
    //         var bIndex=-1;
    
    //         while ((aIndex==-1) && (bIndex==-1) && (i>=0))
    //         {
    //             if (s.substring(i, i+1) == a)
    //                 aIndex=i;
    //             if (s.substring(i, i+1) == b)
    //                 bIndex=i;
    
    //             i--;
    //         }
    
    //         if (aIndex != -1)
    //         {
    //             if (bIndex == -1)
    //                 return aIndex;
    //             else
    //                 return Math.max(aIndex, bIndex);
    //         }
    //         else
    //         {
    //             if (bIndex != -1)
    //                 return bIndex;       
    //           else
    //                 return -1;
    //         }
    //     }
    // };  
    
    // const returnMaxIndex = (s, a, b) => {
    //     if (s === "") return -1;
    //     const x = s.lastIndexOf(a);
    //     const y = s.lastIndexOf(b);
    //     return Math.max(x, y); }
    
    
    /* for render 2 arrys like  side by side like a zipper this: 
    
    var myFn = function (a, b) { console.log(a, b);}
      var arr1 = ['a', 'b', 'c'];
      var arr2 = [1, 2, 3];
    
      arr1.map(myFn, arr2); // imaginary syntax.
      // prints :
      // a 1
      // b 2
      // c 3
    
    */  
    
    // let zipper = (arr1, arr2) => arr1.map((i, j) => [i, arr2[j] ] );
    
    // call it
    //zip(["a","b","c"], [1,2,3]); // ["a", 1], ["b", 2], ["c", 3]
    
    // ===============================

    /* // qr code to https://github.com/urlsab // <img src='https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fgithub.com%2Furlsab&chs=180x180&choe=UTF-8&chld=L|2' alt='qr code'></img> */
    /* maybe un neccery <a src='https://www.qr-code-generator.com' rel='nofollow'>click here</a> */

    // ======================================================================================
    {/* 2 ways to open link on new tab */}

    // const openInNewTab = url => {
    //     window.open(url, '_blank', 'noopener,noreferrer');
    // };
            {/* <button onClick={() => openInNewTab('https://google.com')}>Google</button>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer"> Google</a> */}
    // ======================================================================================