# π 1μ₯ λ³μ ν λΉμΌλ‘ μλλ₯Ό νννλΌ  βοΈ
- `cosnt`λ λ³μλ₯Ό μ¬ν λΉν  μ μλ λ°©μ
- `let`μ μ¬ν λΉμ΄ κ°λ₯νμ§λ§ λΈλ‘ μ ν¨ λ²μκ° μ μ©λμ΄ μ μ¬μ μΈ μ ν¨ λ²μ μΆ©λμ΄ λ°μνμ§ μλλ‘ λ³΄νΈ 
- μ μΈν λ³μλ₯Ό μ¬μ©ν΄ μλ‘μ΄ λ¬Έμμ΄μ μμ±ν  μ μλ `ννλ¦Ώ λ¦¬ν°λ΄`μ μ¬μ©λ² 

<br>

***
<br><br>

## TIP 1 : constλ‘ λ³νμ§ μλ κ°μ νννλΌ π
π constλ₯Ό μ΄μ©ν΄ μ¬ν λΉμ νΌνκ³  μλλ₯Ό λ€λ₯Έ κ°λ°μμκ² μ λ¬νλ λ°©λ²

- `const`λ μ½λλ₯Ό μ½κΈ° μ½κ² λ§λλ μ μ½ μ¬ν­μ κ°μ§κ³  μλ€. 
- `const`λ λΈλ‘μ λ¬Έλ§₯ λ΄μμ μ¬ν λΉν  μ μλ λ³μ μ μΈμ΄λ€. 
- μ¦, ν λ² μ μΈνλ©΄ λ³κ²½ν  μ μλ€. 
- κ·Έλ μ§λ§ κ°μ΄ λ³κ²½λμ§ μλ κ², μ¦ λΆλ³κ°μ΄ λλ κ²μ μλλ€. 
- `const`μ λ°°μ΄μ ν λΉνλ κ²½μ°μλ λ°°μ΄μ ν­λͺ©μ λ°λ μ μλ€. 

<br>

- κ°μ ν λΉνλ€λ κ²μ λ¨μν μ λ³΄λ₯Ό μ μΈνλ κ²μ΄ μλλ€. 
- λ¬΄μμ μ λ³΄λ‘ ν μ§μ λν μ νΈλ₯Ό λ³΄λ΄λ κ² 
- κ°μ ν λΉνκ³  λ³κ²½νμ§ μμ κ²μ΄λΌλ μ μ νμνλ©΄, μ½λλ₯Ό νμ΄λ³Ό λ ν΄λΉ λ³μλ₯Ό μ κ²½ μ°μ§ μμλ λλ€κ³  μλ €μ€ μ μλ€. 

```js
const taxRate = 0.1;
const total = 100 + (100 * taxRate);
// 100νμ μ½λλ₯Ό κ±΄λλ°μμ΅λλ€.
return `κ΅¬λ§€ κΈμ‘μ ${total}μλλ€. `;

var taxRate = 0.1;
var total = 100 + (100 * taxRate);
// 100νμ μ½λλ₯Ό κ±΄λλ°μμ΅λλ€. 
return `κ΅¬λ§€ κΈμ‘μ ${total}μλλ€.`;
```
- μ²« λ²μ§Έ μ½λκ° ν¨μ¬ μ΄ν΄νκΈ° μ½λ€. 
- μ²« λ²μ§Έ μ½λμμλ `κ΅¬λ§€ κΈμ‘μ 110μλλ€`κ° λ°νλλ€λ κ²μ μ ννκ² μ μ μλ€. 
- `var`λ₯Ό μ΄μ©ν΄μ ν λΉν κ²½μ°μλ `total`μ΄ μ΄λ€ κ°μ΄ λ μ§ μ μ μλ€. 

```js
const taxRate = 0.1;
const shipping = 5.00;
let total = 100 + (100 * taxRate) + shipping;
// 100νμ μ½λλ₯Ό κ±΄λλ°μμ΅λλ€.
return `κ΅¬λ§€ κΈμ‘μ ${total}μλλ€. `;
```
- `total`μ΄ μ΄λ€ κ°μ΄ λ μ§ νμ ν  μ μλ€. 

- `const`λ₯Ό μμ£Ό μ¬μ©νκ³  `let`μ λλ¬Όκ² μ¬μ©νλ©΄ λ³κ²½λλ λΆλΆμ μμΈ‘ν  μ μλ€. 
- `const`μ ν λΉλ κ°μ΄ λΆλ³κ°μ΄ λμ§λ μλλ€
- μ¦, λ³μλ₯Ό μ¬ν λΉν  μλ μμ§λ§, κ°μ λ°κΏ μλ μλ€. 
```js
const discountable = [];
// μ½λλ₯Ό λͺ ν κ±΄λλ°μμ΅λλ€.
for (let i = 0; i < createImageBitmap.length; i++){
  if (cart[i].discountAvailable){
    discountable.push(cart[i])
  }
}
```
- λ°°μ΄μ ν­λͺ©μ μΆκ°ν  μ μλ€. 
```js
const discountable = cart.filter(item => item.discountAvailable);
```
- μ‘°μ(mutation)μ νμ§ μκ³  μμ± 
- κ²°κ³Όλ κ°μ§λ§ μ‘°μμ μ¬μ©νμ§ μμλ€. 
- `const`λ₯Ό κΈ°λ³ΈμΌλ‘ μ¬μ©νμ. 

<br>

***
<br><br>

## TIP 2 : letκ³Ό constλ‘ μ ν¨ λ²μ μΆ©λμ μ€μ¬λΌ π
π κ°μ΄ λ³κ²½λλ κ²½μ° κ°μ₯ μ’μ μ νμ `let`

- λ³μλ₯Ό λ€λ£° λλ μ¬ν λΉμ νΌνλ κ²μ΄ λ«λ€
- λ³μλ₯Ό λ°λμ μ¬ν λΉν΄μΌνλ κ²½μ°λΌλ©΄ `let`μ μ¬μ©νλ€. 
- `let`μ μ¬ν λΉν  μ μλ€λ μ μμ `var`μ μ μ¬νλ€. 
- `var`λ μ΄νμ  μ ν¨ λ²μλ₯Ό λ°λ₯΄λ λ°λ©΄, `let`μ λΈλ‘ μ ν¨ λ²μλ₯Ό λ°λ₯Έλ€. 
  - λΈλ‘ μ ν¨ λ²μ λ³μλ if λΈλ‘μ΄λ for λ°λ³΅λ¬Έ κ°μ λΈλ‘μ λ΄λΆμλ§ μ‘΄μ¬νλ€. 
  - λΈλ‘ λ°μμλ λΈλ‘ μ ν¨ λ²μ λ³μμ μ κ·Όν  μ μλ€. 
  - μ¦, λ³μλ₯Ό μ μΈν μ€κ΄νΈλ₯Ό λ²μ΄λλ©΄ λ³μκ° μ‘΄μ¬νμ§ μλλ€ . 

```js
  function getLowestPrice(item){
  var count = item.inventory;
  var price = item.price;
  if (item.salePrice){
    var count = item.saleInventory;
    if (count > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
```

- λ³μλ₯Ό κ°μ μ΄λ¦μ λ³μμ μ¬ν λΉν κ²μ΄ λ¬Έμ 
- `let` μ λΈλ‘ μ ν¨ λ²μλ₯Ό λ°λ₯΄λ―λ‘ λΈλ‘ λ΄λΆμ μ μΈν λ³μλ λΈλ‘ μΈλΆμ μ‘΄μ¬νμ§ μλλ€. 
```js
function getLowestPrice(item){
  let count = item.inventory;
  let price = item.price;
  if (item.salePrice){
    let count = item.saleInventory;
    if (count > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
```
- λ³μ countλ₯Ό μ μΈνκΈ° μν΄ `if λΈλ‘` μμμ `let`μ μ¬μ©νκΈ° λλ¬Έμ ν¨μλ₯Ό μμν  λ μ μΈν λ³μ `count`μ μΆ©λνμ§ μλλ€. 
- `const`λ λΈλ‘ μ ν¨ λ²μλ₯Ό λ°λ₯Έλ€. 
- λ³μμ κ°μ΄ λ³κ²½λλ κ²½μ°λ μμΌλ―λ‘ κ³μν΄μ `let`μ μ¬μ©ν  μλ μκ² μ§λ§, μμ λ€λ₯Έ μ΄λ¦μ μ°λ νΈμ΄ λ νμ€νλ€. 

```js
function getLowestPrice(item){
  const count = item.inventory;
  let price = item.price;
  if (item.salePrice){
    const saleCount = item.saleInventory;
    if (saleCount > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
```

- `let`κ³Ό `const`λ μλ‘μ΄ λ³΄νΈ λ°©λ²μ κ°μ§κ³  μλ€. 
- `let`κ³Ό `const`λ κ°μ μ΄λ¦μ λ³μλ₯Ό λ€μ μ μΈν  μ μλ€. 
- `var`λ₯Ό μ¬μ©νλ κ²½μ°μλ κ°μ μ ν¨ λ²μμμ κ°μ μ΄λ¦μ λ³μλ₯Ό λ€μ μ μΈν  μλ μλ€. 

```js
function getLowestPriceDeclareation(item){
  const count = item.inventory;
  let price = item.price;
  if (!count){
    return 0;
  }
  // ...
  let price = item.saleInventory ? item.salePrice : item.wholesalePrice;
  return price;
}
```

<br>

***
<br><br>

## TIP 3 : λΈλ‘ μ ν¨ λ²μ λ³μλ‘ μ λ³΄λ₯Ό κ²©λ¦¬νλΌ π
π `for`λ¬Έ λλ λ€λ₯Έ λ°λ³΅λ¬Έμμ `let`μ μ¬μ©ν΄ μ ν¨ λ²μ μΆ©λμ λ°©μ§νλ λ°©λ²

- λΈλ‘ μ ν¨ λ²μ λ³μ μ μΈμ μ΄μ©νλ©΄ λ³μλ λΈλ‘ λ΄μμλ§ μ κ·Ό ν  μ μλ€. 
  - `if` λΈλ‘ λ΄λΆμ λ³μλ₯Ό μ μΈνλ©΄ μ€κ΄νΈ λ°μμλ μ κ·Όν  μ μλ€ 
  - `for`λ¬Έ λ΄λΆμ μ μΈν λ³μλ `for`λ¬Έμ μ€κ΄νΈ λ°μμλ μ κ·Όν  μ μλ€. 
  - λ°λλ‘ ν¨μ μΈλΆμ μ μΈν λ³μλ λΈλ‘ λ΄λΆμμ μ κ·Όν  μ μλ€. 
  - ν¨μμ μ΅μμμμ λΈλ‘ μ ν¨ λ²μ λ³μλ₯Ό μ μΈν κ²½μ°μλ ν¨μ λ΄λΆμ `if`λ¬Έμ΄λ `for`λ¬Έμμ μ κ·Ό ν  μ μλ€. 

  <br>

  - μ΄νμ  μ ν¨ λ²μλ₯Ό λ°λ₯΄λ λ³μλ₯Ό μ μΈν κ²½μ°μλ ν¨μ λ΄λΆ μ΄λμλ  μ κ·Όν  μ μλ€ 
    - μ΄ κ²½μ° `if` λΈλ‘ λ΄λΆμμ μμ±ν λ³μλ₯Ό ν¨μ λ΄λΆμ λ€λ₯Έ κ³³μμ μ κ·Ό ν  μ μλ€. 
    - `νΈμ΄μ€ν`μ΄λΌλ μ»΄νμΌ κ³Όμ  λλΆμ λ³μκ° μ μΈλκΈ°λ μ μ μ κ·Όν  μ μλ€. 
```js
function addClick(items){
  for (var i = 0; i < items.length; i++){
    items[i].onClick = function (){
      return i;
    };
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
```
- μ ν¨ λ²μμ λ¬Έμ 
- `var`λ‘ ν λΉν λ³μλ ν¨μ μ ν¨ λ²μλ₯Ό λ°λ₯Έλ€. (μ΄νμ  μ ν¨ λ²μλ₯Ό μλ―Έ)
- μ¦, ν¨μ λ΄μμ λ§μ§λ§μΌλ‘ ν λΉν κ°μ μ°Έμ‘°νλ€. 
```js
function addClick(items){
  for (var i = 0; i < items.length; i++){
    items[i].onClick = (function (i){
      return function () {
        return i;
      };
    }(i));
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
```
- μ ν΅μ μΈ ν΄κ²° λ°©λ²μ ν΄λ‘μ ( λ€λ₯Έ ν¨μκ° μ¬μ©ν  μ μλλ‘ ν¨μ λ΄λΆμμ λ³μλ₯Ό μμ±νλ κ²), κ³ μ°¨ ν¨μ(λ€λ₯Έ ν¨μλ₯Ό λ°ννλ ν¨μ), μ¦μ μ€ν ν¨μκ° μ‘°ν©λμ΄ μλ€. 

```js
function addClick(items){
  for (let i = 0; i < items.length; i++){
    items[i].onClick = function (){
        return i;
    };
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
```
- `var` λμ  `let`μ μ¬μ©ν κ²λΏμ΄λ€. 
- `let`μ λΈλ‘ μ ν¨ λ²μλ₯Ό λ°λ₯΄λ―λ‘, λΈλ‘ λ΄μμ μ μΈν λ³μλ ν΄λΉ λΈλ‘μμλ§ μ ν¨νλ€. 
- `let`μ μ΄μ©νλ©΄ `for` λ¬Έμ΄ λ°λ³΅λ  λλ§λ€ κ°μ μ κ·Όλ€. 
- `var`λ₯Ό μ¬μ©νλ € ν κ³³μ ν­μ `let`μ μ¬μ©νλ κ²μ΄ μ’λ€. 

<br>

***
<br><br>

## TIP 4 : ννλ¦Ώ λ¦¬ν°λ΄λ‘ λ³μλ₯Ό μ½μ μ μλ λ¬Έμμ΄λ‘ λ³ννλΌ π
π λ³μλ₯Ό μ°κ²°νμ§ μκ³  μλ‘μ΄ λ¬Έμμ΄λ‘ λ§λλ λ°©λ² 

- μλ°μ€ν¬λ¦½νΈμμ λ¬Έμμ΄μ μ°κ²°νλ κ²μ νΉνλ κ³¨μΉ μν μΌμΈλ°, λ³μμ ν λΉν λ¬Έμμ΄κ³Ό λ°μ΄νλ‘ κ°μΌ λ¬Έμμ΄μ μ°κ²°ν΄μΌ νλ κ²½μ°μλ λμ±λ κ·Έλ λ€. 
- ννλ¦Ώ λ¦¬ν°λ΄μ μ¬μ©νλ©΄ λ³΅μ‘λλ₯Ό μ€μΌ μ μλ€. 
- ννλ¦Ώ λ¦¬ν°λ΄μ μλ°μ€ν¬λ¦½νΈ ννμμ μ¬μ©ν΄μ λ¬Έμμ΄μ μ°κ²°νκ³  μλ‘μ΄ λ¬Έμμ΄μ μμ±νλ κ°λ¨ν λ¬Έλ²μ΄λ€. 

1. ννλ¦Ώ λ¦¬ν°λ΄μ λ°μ΄ν λλ μλ°μ΄ν λμ  **λ°±ν±(`)**μ μ¬μ©νλ€. 
2. λ³μμ ν λΉν λ¬Έμμ΄μ²λΌ λ¨μ λ¬Έμμ΄μ΄ μλλΌλ©΄ νΉλ³ν μ§μ μλ‘ κ°μΈμΌ νλ€. 
  - `${stuff}`μ²λΌ `$` κΈ°νΈμ μ€κ΄νΈλ‘ λ³μλ λ€λ₯Έ μλ°μ€ν¬λ¦½νΈ μ½λλ₯Ό κ°μΈλ κ²μ΄λ€. 

- ννλ¦Ώ λ¦¬ν°λ΄μ λ¬Έμμ΄κ³Ό λ³μλ₯Ό μ°κ²°ν  λ κ°μ₯ μμ£Ό μ¬μ©νλ€. 
```js
function greet(name){
  return `Hi, ${name}`;
}
greet('Leo');
// 'Hi, Leo';
```

- μλ°μ€ν¬λ¦½νΈ λμμ μνν  μλ μλ€. 
```js
function yell(name){
  return `HI, ${name.toUpperCase()}!`;
}
greet('Pankaj');
// 'HI, PANKAJ!';
```

```js
function leapYearConverter(age){
  return `μ€λμ νμ΄λ¬λ€λ©΄ ${Math.floor(age / 4)} μ΄μ΄μΌ.`;
}
leapYearConverter(34);
// "μ€λμ νμ΄λ¬λ€λ©΄ 8μ΄μ΄μΌ
```
- μν κ³μ°κ³Ό μ°κ²°ν΄ λμ± λ³΅μ‘ν κ³μ°μ μνν  μλ μλ€. 
- μ€κ΄νΈ μμμ μ΄λ€ μμμ΄λ  μνν  μ μμ§λ§, λ¬Έμμ΄μ΄λ μ μλ₯Ό λ°ννλ μμμ΄ μ μ νλ€.
- κ°κΈμ μ΄λ©΄ μ€κ΄νΈ λ΄λΆμμ λ§μ κ²μ νμ§ μλ κ²μ΄ μ’λ€. 
- μ½λκ° νμ μ΄μμΌλ‘ μ΄μμ ν΄μ§κΈ° λλ¬Έ
- λκ·λͺ¨ λ°μ΄ν° λ³νμ΄ νμν κ²½μ°μλ ννλ¦Ώ λ¦¬ν°λ΄ μΈλΆμμ μ²λ¦¬νκ³  κ²°κ΄κ°μ λ³μμ ν λΉν΄ μ¬μ©νλ€. 

- λ¬Έμμ΄ μ°κ²° μ½λλ₯Ό ννλ¦Ώ λ¦¬ν°λ΄ ν μ€λ‘ μ λ¦¬ν  μ μλ€. 
```js
function generateLink(image, width){
  return `https://${getProvider()}/${image}?width=${parseInt(width,10)}`;
}
```


