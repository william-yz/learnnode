'use strict';
const readline = require('readline'),
  os = require('os');
class Chessbord {
  constructor(n) {
    this.width = n;
    this.lines = this.genBlankArr();
    this.hasChange = true;
    this.genNum();
    this.genNum();
    this.last = this.lines;
  }

  genBlankArr() {
    var lines = []
    for (let i = 0; i < this.width; i ++) {
      lines[i] = [];
      for (let j = 0; j < this.width; j ++) {
        lines[i][j] = 0;
      }
    }
    return lines;
  }

  handleInput(d) {
    switch(d) {
      case 'l':
      case 'L':
        this.left();
        break;
      case 'r':
      case 'R':
        this.right();
        break;
      case 'u':
      case 'U':
        this.up();
        break;
      case 'd':
      case 'D':
        this.down();
        break;
    }

  }

  reset(index) {
    for (let i = 0; i < this.width; i ++) {
      this.lines[index][i] = 0;
    }
  }

  transform() {
    var newLines = this.genBlankArr();
    this.lines.forEach((line, i) => {
      line.forEach((n,j) => {
        newLines[j][i] = n;
      });
    });
    this.lines = newLines;
  }

  move(willReverse, willTransform) {
    this.hasChange = false;
    willTransform && this.transform();
    this.lines.forEach((line, lineIndex) => {
      let lineNums = [],
          preNone0 = -1,
          hasZero = false;
      willReverse && line.reverse();
      line.forEach((n) => {
        if (n === preNone0) {
          this.hasChange = true;
          lineNums.push(preNone0 << 1);
          preNone0 = -1;
        } else {
          if (n !== 0) {
            if (preNone0 === -1) {
                preNone0 = n;
            } else {
                lineNums.push(preNone0);
                preNone0 = n;
            }
            if (hasZero) {
              this.hasChange = true;
            }
          } else {
            hasZero = true;
          }
        }
      });
      if (preNone0 !== -1) {
        lineNums.push(preNone0);
      }
      this.reset(lineIndex);
      lineNums.forEach((n, i) => willReverse && (line[3-i] = n) || (line[i] = n));
    });
    willTransform && this.transform();
  }

  canMove() {
    for (let i = 0; i < this.width - 1; i ++) {
      for (let j = 0; j < this.width - 1; j ++) {
        if (this.lines[i][j] === this.lines[i+1][j] || 
            this.lines[i][j] === this.lines[i][j+1])
          return true;
      }
    }
    return false;
  }

  genNum() {
    var emptyPoints = [],
      max = 0;
    this.lines.forEach((line, i) => {
      line.forEach((n,j) => {
        if (n === 0) {
          emptyPoints.push([i, j]);
        } else {
          if (n > max) {
            max = n;
          }
        }
      });
    });
    this.max = max;
    if (this.hasChange) {
      var genPoint = emptyPoints[Math.floor(Math.random() * emptyPoints.length)];
      this.lines[genPoint[0]][genPoint[1]] = 2;
    } else {
      if (emptyPoints.length == 0 && !this.canMove()) {
        console.log(`Game over!`);
        //process.exit(0);
        this.gua = true;
      } else {
        this.ka = true;
        return;
      }
    }
    this.ka = false;
  }

  display() {
    this.lines.forEach((line) => {
      var lineStr = '';
      line.forEach((n) => {
        lineStr += `|${n}`;
      })
      console.log(`${lineStr}|`);
    });
    console.log(`---------`);
  }

  right() {
    this.move(true, false);
  }

  left() {
    this.move(false, false);
  }
  
  up() {
    this.move(false, true);
  }

  down() {
    this.move(true, true);
  }

  step(d) {
    this.handleInput(d);
    this.genNum();
    // this.display();
  }

  toKey() {
    
  }
}

var c = new Chessbord(4);
c.display();
var lastKa = false;
var count = 1;
while(true) {
  c.step('l');
  c.step('d');
  if (c.ka) {
    c.step('r');
    lastKa = true;
  } else {
    lastKa = false;
  }
  if (lastKa && c.ka) {
    c.step('u');
    lastKa = false;
  }
  if (c.gua) {
    console.log(c.max);
    if (c.max >= 1024) {
      console.log(count);
      process.exit(0);
    }
    c = new Chessbord(4);
    count ++;
  }
}