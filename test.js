const chai = require("chai");
const wordChecker = require('./logic');

describe('Wordle', () => {

  describe('Basic colors', () => {
    it('Greens the correct letter in the correct position', () => {
      let result = wordChecker('eeeee', 'eeeee');
      chai.expect(result).to.deep.equal(['green', 'green', 'green', 'green', 'green', ]);
    });
  
    it('Greys letters that do not exist in the answer', () => {
      let result = wordChecker('aaaaa', 'zzzzz');
      chai.expect(result).to.deep.equal(['grey', 'grey', 'grey', 'grey', 'grey', ]);
    })
  
    it('Yellows letters that exist in the answer, but are not in the correct position', () => {
      let result = wordChecker('abcde', 'ecdab');
      chai.expect(result).to.deep.equal(['yellow', 'yellow', 'yellow', 'yellow', 'yellow', ]);
    })  
  });
  
  describe('Yellow can be tricky', () => {

    it('Greys letters that have had all their occurrences already greened', () => {
        let result = wordChecker('abcde', 'eeeee');
        chai.expect(result).to.deep.equal(['grey', 'grey', 'grey', 'grey', 'green']);
    });


    it('Grays letters that have had all their occurrences already yellowed', () => {
      let result = wordChecker('zexxx', 'ezzez');
      chai.expect(result).to.deep.equal(['yellow', 'yellow', 'grey', 'grey', 'grey']);
    })

  });


  describe('Let em rip!!', () => {

    it('"FLAIL" vs "PLEAT"', () => {
        let result = wordChecker('pleat', 'flail');
        chai.expect(result).to.deep.equal(['grey', 'green', 'yellow', 'grey', 'grey']);
    });

    it('"PLAIN" vs "PLEAT"', () => {
      let result = wordChecker('pleat', 'plain');
      chai.expect(result).to.deep.equal(['green', 'green', 'yellow', 'grey', 'grey']);
    });

    it('"TAPER" vs "PLEAT"', () => {
      let result = wordChecker('pleat', 'taper');
      chai.expect(result).to.deep.equal(['yellow', 'yellow', 'yellow', 'yellow', 'grey']);
    });

    it('"LAPEL" vs "PLEAT"', () => {
      let result = wordChecker('pleat', 'lapel');
      chai.expect(result).to.deep.equal(['yellow', 'yellow', 'yellow', 'yellow', 'grey']);
    });

    it('"TEMPO" vs "PLEAT"', () => {
      let result = wordChecker('pleat', 'tempo');
      chai.expect(result).to.deep.equal(['yellow', 'yellow', 'grey', 'yellow', 'grey']);
    });

    it('"PLEAT" vs "PLEAT"', () => {
      let result = wordChecker('pleat', 'tempo');
      chai.expect(result).to.deep.equal(['yellow', 'yellow', 'grey', 'yellow', 'grey']);
    });


    // it('"ZEEZZ" vs "EQEEE"', () => {
    //   let result = wordChecker('zeezz', 'eqeee');
    //   chai.expect(result).to.deep.equal(['yellow', 'grey', 'green', 'grey', 'grey']);
    // });

    it('"BOORS" vs "ROBOT"', () => {
      let result = wordChecker('robot', 'boors');
      chai.expect(result).to.deep.equal(['yellow', 'green', 'yellow', 'yellow', 'grey']);
    });
  });

})



  // TEMPLATE
  // it('', () => {
  //   let result = wordChecker('', '');
  //   chai.expect(result).to.deep.equal(['', '', '', '', ''])
  // })
